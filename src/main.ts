import { inject, provideAppInitializer, provideZonelessChangeDetection } from '@angular/core';
import { AppComponent } from './app/app.component';
import { provideRouter, withRouterConfig } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { StoreService } from './shared/store.service';
import { AppConfigService } from './shared/app.config';

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    // 'reload' re-runs the guard when a new file is read while already on /see
    provideRouter(routes, withRouterConfig({ onSameUrlNavigation: 'reload' })),
    AppConfigService,
    provideAppInitializer(() => {
      const config = inject(AppConfigService);
      return config.load();
    }),
    StoreService,
    provideHttpClient(withXhr())
  ]
})
  .catch(err => console.error(err));
