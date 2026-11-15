import { enableProdMode, importProvidersFrom, inject, provideAppInitializer, provideZonelessChangeDetection } from '@angular/core';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { withInterceptorsFromDi, provideHttpClient, withXhr } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { PortableExecutableGuard } from './shared/portable-executable-guard.service';
import { StoreService } from './shared/store.service';
import { AppConfigService } from './shared/app.config';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    importProvidersFrom(BrowserModule, FormsModule, AppRoutingModule),
    AppConfigService,
    provideAppInitializer(() => {
      const config = inject(AppConfigService);
      return config.load();
    }),
    StoreService,
    PortableExecutableGuard,
    provideHttpClient(withXhr(), withInterceptorsFromDi())
  ]
})
  .catch(err => console.error(err));
