// src/app/components/form-cadastro/form-cadastro.component.ts
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputPrimaryComponent } from '../input-primary/input-primary.component';
import { ButtonPrimaryMdComponent } from '../button-primary-md/button-primary-md.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ResponsavelDto } from '../../dto/responsavel.dto';
import { UsuarioEscolaDto } from '../../dto/usuario-escola.dto';

@Component({
  selector: 'app-form-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputPrimaryComponent,
    ButtonPrimaryMdComponent
  ],
  templateUrl: './form-cadastro.component.html',
  styleUrls: ['./form-cadastro.component.scss']
})
export class FormCadastroComponent implements OnInit {
  form!: FormGroup;
  roles = ['RESPONSÁVEL', 'USUARIO_ESCOLA'];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required],
      role: ['RESPONSÁVEL'],
      termos: [false, Validators.requiredTrue]
    }, {
      validators: this.senhasIguais('senha', 'confirmarSenha')
    });
  }

  private senhasIguais(s: string, c: string) {
    return (g: FormGroup) => {
      const pass = g.controls[s] as FormControl;
      const confirm = g.controls[c] as FormControl;
      confirm.setErrors(pass.value !== confirm.value ? { mismatch: true } : null);
    };
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // monta objeto de acordo com a role
    const fv = this.form.value;
    const nomeCompleto = `${fv.nome} ${fv.sobrenome}`;

    if (fv.role === 'RESPONSÁVEL') {
      const dto: ResponsavelDto = {
        nomeCompleto,
        email: fv.email,
        senha: fv.senha,
        roles: [fv.role],
        // cpf, telefone e endereco podem vir do formulário se você adicionar campos
      };

      this.auth.registerResponsavel(dto).subscribe({
        next: () => this.router.navigate(['/login']),
        error: err => alert('Erro no cadastro: ' + err.error?.message || err.message)
      });

    } else { // USUARIO_ESCOLA
      const dto: UsuarioEscolaDto = {
        nomeCompleto,
        email: fv.email,
        senha: fv.senha,
        roles: [fv.role],
        // cpf, matricula, etc
      };

      this.auth.registerEscola(dto).subscribe({
        next: () => this.router.navigate(['/login']),
        error: err => alert('Erro no cadastro: ' + err.error?.message || err.message)
      });
    }
  }

  // Getters para o template
  get nomeControl()           { return this.form.get('nome')! as FormControl; }
  get sobrenomeControl()      { return this.form.get('sobrenome')! as FormControl; }
  get dataNascimentoControl() { return this.form.get('dataNascimento')! as FormControl; }
  get emailControl()          { return this.form.get('email')! as FormControl; }
  get senhaControl()          { return this.form.get('senha')! as FormControl; }
  get confirmarSenhaControl() { return this.form.get('confirmarSenha')! as FormControl; }
  get roleControl()           { return this.form.get('role')! as FormControl; }
  get termosControl()         { return this.form.get('termos')! as FormControl; }
}