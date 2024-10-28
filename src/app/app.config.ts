import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localeArEg from '@angular/common/locales/ar-EG';
import localeEn from '@angular/common/locales/en';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { HandleErrorInterceptor } from './shared/interceptors/handle-error-interceptor';
import { AppTranslateModule } from './shared/modules/app-translate.module';

// Register locales
registerLocaleData(localeArEg, 'ar-EG');
registerLocaleData(localeEn, 'en');
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule, AppTranslateModule.forRoot()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HandleErrorInterceptor,
      multi: true,
    },
    provideAnimations(),
    provideToastr({
      preventDuplicates: true,
    }),
  ],
};
