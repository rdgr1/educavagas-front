// main.ts
import { bootstrapApplication }     from '@angular/platform-browser';
import { importProvidersFrom }      from '@angular/core';
import { provideRouter }            from '@angular/router';
import { provideHttpClient, 
         withInterceptorsFromDi, 
         withFetch, 
         HTTP_INTERCEPTORS }       from '@angular/common/http';
import { provideAnimations }        from '@angular/platform-browser/animations'; // ← aqui
import { ToastrModule }             from 'ngx-toastr';

import { AppComponent }             from './app/app.component';
import { routes }                   from './app/app.routes';
import { AuthInterceptor }          from './app/guards/auth.interceptor';
import { XhrInterceptor } from './app/guards/xhr.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),                           
    provideHttpClient(
      withInterceptorsFromDi(),
      withFetch()
    ),

    // 2) Toastr
    importProvidersFrom(
      ToastrModule.forRoot({
        positionClass: 'toast-bottom-right',
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'decreasing',
        preventDuplicates: true,
        newestOnTop: true,
      })
    ),
     { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true },
    // 3) roteador e interceptor de auth
    provideRouter(routes),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
})
.catch(err => console.error(err));