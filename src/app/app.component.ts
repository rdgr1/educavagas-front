// src/app/app.component.ts
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser }              from '@angular/common';
import { RouterOutlet }                   from '@angular/router';
import { NgIf, AsyncPipe }                from '@angular/common';
import { Observable }                     from 'rxjs';

import { NavBarComponent }        from './components/nav-bar/nav-bar.component';
import { NavBarLoggedComponent }  from './components/nav-bar-logged/nav-bar-logged.component';
import { AuthService }            from './services/auth.service';
import { UsuarioDto }             from './dto/usuario.dto';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf,
    AsyncPipe,
    NavBarComponent,
    NavBarLoggedComponent
  ],
    template: `
    <ng-container *ngIf="(auth.usuario$ | async) as user; else anonNav">
      <app-nav-bar-logged></app-nav-bar-logged>
    </ng-container>
    <ng-template #anonNav>
      <app-nav-bar></app-nav-bar>
    </ng-template>

    <router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public auth: AuthService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.auth.init();
    }
  }
  get user$(): Observable<UsuarioDto | null> {
    return this.auth.usuario$;
  }
}