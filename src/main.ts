// src/main.ts
import { bootstrapApplication }             from '@angular/platform-browser';
import { importProvidersFrom }              from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi, withFetch } 
                                            from '@angular/common/http';
import { provideRouter }                    from '@angular/router';
import { provideAnimations }                from '@angular/platform-browser/animations';

import { BrowserAnimationsModule }          from '@angular/platform-browser/animations';
import { ToastrModule }                     from 'ngx-toastr';

import { AppComponent }                     from './app/app.component';
import { routes }                           from './app/app.routes';
import { AuthInterceptor }                  from './app/guards/auth.interceptor';
import { AuthGuard }                        from './app/guards/auth.guard';

bootstrapApplication(AppComponent, {
  providers: [
    // 1) Módulo de animações + ToastrModule.forRoot() → carrega o ToastConfig
    importProvidersFrom(
      BrowserAnimationsModule,
      ToastrModule.forRoot({
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        // qualquer outra config padrão do Toastr...
      })
    ),

    // 2) Interceptor de autenticação
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

    // 3) HttpClient com fetch() e interceptors via DI
    provideHttpClient(
      withInterceptorsFromDi(),
      withFetch()
    ),

    // 4) Roteamento e guardas
    provideRouter(routes),
    provideAnimations(),
    AuthGuard
  ]
}).catch(err => console.error(err));