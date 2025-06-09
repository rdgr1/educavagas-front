import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router }     from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  catchError,
  of,
  tap,
  throwError
} from 'rxjs';
import { UsuarioDto } from '../dto/usuario.dto';
import { ResponsavelDto } from '../dto/responsavel.dto';
import { UsuarioEscolaDto } from '../dto/usuario-escola.dto';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiBase = '/autenticacao';
  private userSubject = new BehaviorSubject<UsuarioDto | null>(null);
  public usuario$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router     // <-- injetado
  ) {}

  init(): void {
    if (typeof window === 'undefined' || !('localStorage' in window)) {
      this.userSubject.next(null);
      return;
    }
    const auth = window.localStorage.getItem('auth');
    if (!auth) {
      this.userSubject.next(null);
      return;
    }
    this.http.get<UsuarioDto>(`${this.apiBase}/usuario`)
      .pipe(
        tap(user => this.userSubject.next(user)),
        catchError(_ => {
          this.logout();
          return of(null);
        })
      )
      .subscribe();
  }

  registerResponsavel(dto: ResponsavelDto): Observable<ResponsavelDto> {
    return this.http.post<ResponsavelDto>(
      `${this.apiBase}/cadastro/responsavel`, dto
    );
  }

  registerEscola(dto: UsuarioEscolaDto): Observable<UsuarioEscolaDto> {
    return this.http.post<UsuarioEscolaDto>(
      `${this.apiBase}/cadastro/escola`, dto
    );
  }

  login(email: string, senha: string): Observable<UsuarioDto> {
    const token = btoa(`${email}:${senha}`);
    const headerValue = `Basic ${token}`;
    window.localStorage.setItem('auth', headerValue);

    return this.http.get<UsuarioDto>(`${this.apiBase}/usuario`)
      .pipe(
        tap(user => {
          this.userSubject.next(user);

          // redireciona de acordo com o tipo
          if (user.tipo === 'ESCOLA') {
            this.router.navigate(['/dashboard-escola']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        }),
        catchError(err => {
          this.logout();
          return throwError(() => err);
        })
      );
  }

  logout() {
    window.localStorage.removeItem('auth');
    this.userSubject.next(null);
  }
}