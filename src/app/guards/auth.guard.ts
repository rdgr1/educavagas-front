// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate, Router, UrlTree,
  ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.auth.init();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.auth.usuario$.pipe(
      take(1),
      map(user => {
        if (user) return true;
        return this.router.createUrlTree(['/login'], {
          queryParams: { returnUrl: state.url }
        });
      })
    );
  }
}