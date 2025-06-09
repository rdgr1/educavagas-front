import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../services/auth.service';
import { InputPrimaryComponent } from '../input-primary/input-primary.component';
import { ButtonPrimaryMdComponent } from '../button-primary-md/button-primary-md.component';
import { ButtonOutlinedMdComponent } from '../button-outlined-md/button-outlined-md.component';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    InputPrimaryComponent,
    ButtonPrimaryMdComponent,
    ButtonOutlinedMdComponent,
  ],
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
})
export class FormLoginComponent implements OnInit {
  form!: FormGroup;

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

  get emailControl() {
    return this.form.get('email')! as FormControl;
  }
  get senhaControl() {
    return this.form.get('senha')! as FormControl;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, senha } = this.form.value;

    this.auth.login(email, senha).subscribe({
      next: (user) => {
        this.toastr.success('Bem-vindo de volta!', 'Login realizado');
        console.log('UsuarioDto retornado:', user);
        console.log('Tipo exato:', JSON.stringify(user.tipo));
        // redireciona conforme o tipo de usuário
        if (user.tipo === 'ESCOLA') {
          this.router.navigate(['/dashboard-escola']);
        } else {
          this.router.navigate(['/dashboard-usuario']);
        }
      },
      error: (err) => {
        this.toastr.error(err.error?.message || err.message, 'Falha no login');
      },
    });
  }
}
