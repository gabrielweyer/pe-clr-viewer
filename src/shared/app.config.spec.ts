import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AppConfigService } from './app.config';

describe('AppConfigService', () => {
  let service: AppConfigService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppConfigService, provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(AppConfigService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  describe('Given environment.json is available', () => {
    it('Then sets build and commit', async () => {
      const loading = service.load();

      httpTesting.expectOne('./environment.json').flush({ build: '20261115.42', commit: 'abc123' });
      await loading;

      expect(service.build).toBe('20261115.42');
      expect(service.commit).toBe('abc123');
    });
  });

  describe('Given environment.json cannot be loaded', () => {
    it('Then resolves so that the app still starts', async () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
      const loading = service.load();

      httpTesting.expectOne('./environment.json').flush('Not found', { status: 404, statusText: 'Not Found' });

      await expect(loading).resolves.toBeUndefined();
      expect(service.build).toBe('');
      expect(service.commit).toBe('');
      expect(consoleError).toHaveBeenCalled();
    });
  });
});
