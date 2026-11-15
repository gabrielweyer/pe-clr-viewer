import { enableProdMode, importProvidersFrom, inject, provideAppInitializer, provideZonelessChangeDetection } from '@angular/core';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { provideRouter, withRouterConfig } from '@angular/router';
import { routes } from './app/app.routes';
import { withInterceptorsFromDi, provideHttpClient, withXhr } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { StoreService } from './shared/store.service';
import { AppConfigService } from './shared/app.config';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    importProvidersFrom(BrowserModule, FormsModule),
    // 'reload' re-runs the guard when a new file is read while already on /see
    provideRouter(routes, withRouterConfig({ onSameUrlNavigation: 'reload' })),
    AppConfigService,
    provideAppInitializer(() => {
      const config = inject(AppConfigService);
      return config.load();
    }),
    StoreService,
    provideHttpClient(withXhr(), withInterceptorsFromDi())
  ]
})
  .catch(err => console.error(err));
