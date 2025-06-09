import { Component, OnInit }       from '@angular/core';
import { CommonModule }             from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { RouterModule, Router }     from '@angular/router';
import { ToastrService }            from 'ngx-toastr';

import { AuthService }              from '../../services/auth.service';
import { InputPrimaryComponent }    from '../input-primary/input-primary.component';
import { ButtonPrimaryMdComponent } from '../button-primary-md/button-primary-md.component';
import { ButtonOutlinedMdComponent }from '../button-outlined-md/button-outlined-md.component';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    InputPrimaryComponent,
    ButtonPrimaryMdComponent,
    ButtonOutlinedMdComponent
  ],
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
})
export class FormLoginComponent implements OnInit {
  form!: FormGroup;

  get emailControl(): FormControl {
    return this.form.get('email')! as FormControl;
  }
  get senhaControl(): FormControl {
    return this.form.get('senha')! as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, senha } = this.form.value;
    this.auth.login(email, senha).subscribe({
      next: user => {
        this.toastr.success(`Bem-vindo de volta, ${user.nomeCompleto}!`);
        // redireciona pro dashboard conforme perfil
        if (user.roles.includes('USUARIO_ESCOLA')) {
          this.router.navigate(['/dashboard-escola']);
        } else {
          this.router.navigate(['/dashboard-usuario']);
        }
      },
      error: err => {
        this.toastr.error(
          err.error?.message ?? 'Usuário ou senha inválidos',
          'Falha no login'
        );
      }
    });
  }
}