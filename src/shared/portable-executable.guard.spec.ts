import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree, provideRouter } from '@angular/router';
import { portableExecutableGuard } from './portable-executable.guard';
import { StoreService } from './store.service';
import { PortableExecutable } from '../app/models/portable-executable';

describe('portableExecutableGuard', () => {
  let store: StoreService;

  const runGuard = () => TestBed.runInInjectionContext(
    () => portableExecutableGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
  );

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [StoreService, provideRouter([])] });
    store = TestBed.inject(StoreService);
  });

  describe('Given a portable executable has been read', () => {
    it('Then allows activation', () => {
      store.setPortableExecutable({} as PortableExecutable);

      expect(runGuard()).toBe(true);
    });
  });

  describe('Given no portable executable has been read', () => {
    it('Then redirects to home', () => {
      const result = runGuard();

      expect(result).toBeInstanceOf(UrlTree);
      expect(TestBed.inject(Router).serializeUrl(result as UrlTree)).toBe('/home');
    });
  });
});
