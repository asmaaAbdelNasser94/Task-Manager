import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideTranslateService, provideTranslateLoader, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { routes } from './app.routes';
import { ConfirmationService, MessageService } from 'primeng/api';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload',
      })
    ),
    provideHttpClient(
      withInterceptors([/* Add HTTP interceptors Errors Handler and Token */])
    ),

    // ngx-translate configuration
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: 'i18n/',
        suffix: '.json',
      }),
      fallbackLang: 'en',
      lang: 'en',
    }),

    // PrimeNG configuration - force light mode (no system dark)
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          // Use a class-based selector instead of system preference.
          // Dark mode will only activate if this class is added to <html> or :host.
          darkModeSelector: 'app-dark-mode',
        },
      },
    }),
    ConfirmationService,
    MessageService
  ],
};
