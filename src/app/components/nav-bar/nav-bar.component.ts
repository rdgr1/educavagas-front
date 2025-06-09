import { Component, OnInit } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { Router, RouterModule }   from '@angular/router';
import { ButtonPrimaryComponent }  from '../button-primary/button-primary.component';
import { ButtonOutlinedComponent } from '../button-outlined/button-outlined.component';
import { AuthService }            from '../../services/auth.service';
import { Observable }             from 'rxjs';
import { UsuarioDto }             from '../../dto/usuario.dto';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonPrimaryComponent,
    ButtonOutlinedComponent
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  usuario$!: Observable<UsuarioDto | null>;

  constructor(
    public auth: AuthService,   // public para permitir binding no template
    private router: Router
  ) {}

  ngOnInit() {
    this.usuario$ = this.auth.usuario$;
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}