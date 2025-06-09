// src/main.ts ou onde você estiver exportando o ApplicationConfig
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter }                                          from '@angular/router';
import { provideClientHydration, withEventReplay }                from '@angular/platform-browser';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  withFetch,
  HTTP_INTERCEPTORS
}                                                                   from '@angular/common/http';
import { BrowserAnimationsModule }                                from '@angular/platform-browser/animations';
import { ToastrModule }                                           from 'ngx-toastr';

import { routes }                                                 from './app.routes';
import { AuthInterceptor }                                        from './guards/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // 1) Animações + ToastrModule.forRoot() → provê o InjectionToken ToastConfig
    importProvidersFrom(
      BrowserAnimationsModule,
      ToastrModule.forRoot({
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        // você pode adicionar mais config do Toastr aqui...
      })
    ),

    // 2) Zone change detection otimizado (opcional)
    provideZoneChangeDetection({ eventCoalescing: true }),

    // 3) Seu interceptor de auth
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

    // 4) HttpClient com suporte a fetch() e interceptors via DI
    provideHttpClient(
      withInterceptorsFromDi(),
      withFetch()
    ),

    // 5) Roteamento
    provideRouter(routes),

    // 6) Hydration (se estiver usando SSR)
    provideClientHydration(withEventReplay())
  ]
};