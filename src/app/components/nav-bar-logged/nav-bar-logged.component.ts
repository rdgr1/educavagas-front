import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { AuthService }       from '../../services/auth.service';
import { Observable }        from 'rxjs';
import { map }               from 'rxjs/operators';
import { UsuarioDto }        from '../../dto/usuario.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar-logged',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar-logged.component.html',
  styleUrls: ['./nav-bar-logged.component.scss']
})
export class NavBarLoggedComponent implements OnInit {
  usuario$!: Observable<UsuarioDto | null>;
  isEscola$!: Observable<boolean>;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.usuario$ = this.auth.usuario$;

    this.isEscola$ = this.usuario$.pipe(
      map(u => !!(u && (u.tipo === 'ESCOLA' || (u as any).escolaUuid)))
    );
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}