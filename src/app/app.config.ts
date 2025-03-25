import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from '@core/auth.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { routes } from './app.routes';
import { AuthService } from './core/services/auth/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(AuthService),
    provideNativeDateAdapter(),
    importProvidersFrom(ToastrModule.forRoot()),
    provideAnimations(),]
};
