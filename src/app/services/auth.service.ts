// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient) {}

  /** Deve ser chamado no startup (ex: AppComponent) */
  init(): void {
    // se não estivermos num browser (ex: SSR), aborta
    if (typeof window === 'undefined' || !('localStorage' in window)) {
      this.userSubject.next(null);
      return;
    }

    const auth = window.localStorage.getItem('auth');
    if (!auth) {
      this.userSubject.next(null);
      return;
    }

    // tenta buscar o usuário corrente
    this.http.get<UsuarioDto>(`${this.apiBase}/usuario`)
      .pipe(
        tap(user => this.userSubject.next(user)),
        catchError(_ => {
          // token inválido ou expirou
          this.logout();
          return of(null);
        })
      )
      .subscribe();
  }

  /** Cadastra novo Responsável */
  registerResponsavel(dto: ResponsavelDto): Observable<ResponsavelDto> {
    return this.http.post<ResponsavelDto>(
      `${this.apiBase}/cadastro/responsavel`, dto
    );
  }

  /** Cadastra novo Usuário-Escola */
  registerEscola(dto: UsuarioEscolaDto): Observable<UsuarioEscolaDto> {
    return this.http.post<UsuarioEscolaDto>(
      `${this.apiBase}/cadastro/escola`, dto
    );
  }

  /** Login com BasicAuth: armazena header e carrega usuário */
  login(email: string, senha: string): Observable<UsuarioDto> {
    const token = btoa(`${email}:${senha}`);
    const headerValue = `Basic ${token}`;
    // salva o header completo em localStorage
    if (typeof window !== 'undefined' && 'localStorage' in window) {
      window.localStorage.setItem('auth', headerValue);
    }

    return this.http.get<UsuarioDto>(`${this.apiBase}/usuario`)
      .pipe(
        tap(user => this.userSubject.next(user)),
        catchError(err => {
          // se deu erro, limpa tudo
          this.logout();
          return throwError(() => err);
        })
      );
  }

  logout(): void {
    if (typeof window !== 'undefined' && 'localStorage' in window) {
      window.localStorage.removeItem('auth');
    }
    this.userSubject.next(null);
  }
}