// src/main.ts
import { bootstrapApplication }    from '@angular/platform-browser';
import { provideRouter }            from '@angular/router';
import {
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';
import { provideAnimations }        from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS }        from '@angular/common/http';

import { AppComponent }             from './app/app.component';
import { routes }                   from './app/app.routes';
import { AuthInterceptor }          from './app/guards/auth.interceptor';
import { AuthGuard }                from './app/guards/auth.guard';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

    provideHttpClient(
      withInterceptorsFromDi()    // <- aqui
    ),

    provideRouter(routes),
    provideAnimations(),
    AuthGuard
  ]
})
.catch(err => console.error(err));