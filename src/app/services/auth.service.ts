// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

import { UsuarioDto } from '../dto/usuario.dto';
import { ResponsavelDto } from '../dto/responsavel.dto';
import { UsuarioEscolaDto } from '../dto/usuario-escola.dto';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // armazena o usuário logado
  private usuarioSubject = new BehaviorSubject<UsuarioDto | null>(null);
  public usuario$ = this.usuarioSubject.asObservable();

  // header Basic em memória
  private authHeader: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  /** Deve ser chamado uma vez, ao iniciar a app, para restaurar credenciais */
  init(): void {
    const stored = localStorage.getItem('auth');
    if (!stored) return;

    this.authHeader = stored;
    const headers = new HttpHeaders().set('Authorization', stored);
    this.http.get<UsuarioDto>('/autenticacao/usuario', { headers })
      .subscribe({
        next: user => this.usuarioSubject.next(user),
        error: () => this.logout()
      });
  }

  /** Faz login via Basic Auth e carrega o usuário */
  login(email: string, senha: string): Observable<UsuarioDto> {
    this.authHeader = 'Basic ' + btoa(`${email}:${senha}`);
    const headers = new HttpHeaders().set('Authorization', this.authHeader);
    return this.http.get<UsuarioDto>('/autenticacao/usuario', { headers }).pipe(
      tap(user => {
        this.usuarioSubject.next(user);
        localStorage.setItem('auth', this.authHeader!);
      })
    );
  }

  /** Desloga limpando estado e redireciona ao login */
  logout(): void {
    this.authHeader = null;
    this.usuarioSubject.next(null);
    localStorage.removeItem('auth');
    this.router.navigate(['/login']);
  }

  /** Indica se já há um usuário carregado */
  isLoggedIn(): boolean {
    return this.usuarioSubject.value != null;
  }

  /** Registro de Responsável */
  registerResponsavel(dto: ResponsavelDto): Observable<ResponsavelDto> {
    return this.http.post<ResponsavelDto>(
      '/autenticacao/cadastro/responsavel',
      dto
    );
  }

  /** Registro de Usuário da Escola */
  registerEscola(dto: UsuarioEscolaDto): Observable<UsuarioEscolaDto> {
    return this.http.post<UsuarioEscolaDto>(
      '/autenticacao/cadastro/escola',
      dto
    );
  }

  /** Fetch “quem sou eu?” */
  obterUsuarioLogado(): Observable<UsuarioDto> {
    // se quiser forçar a usar o header em memória:
    const headers = this.authHeader
      ? new HttpHeaders().set('Authorization', this.authHeader)
      : undefined;
    return this.http.get<UsuarioDto>('/autenticacao/usuario', { headers });
  }
}