import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { InputPrimaryComponent } from '../input-primary/input-primary.component';
import { ButtonPrimaryMdComponent } from '../button-primary-md/button-primary-md.component';

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

  constructor(private fb: FormBuilder) {}

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
    console.log('Cadastro enviado:', this.form.value);
  }

  // Getters para evitar AbstractControl|null no template
  get nomeControl()            { return this.form.get('nome')! as FormControl; }
  get sobrenomeControl()       { return this.form.get('sobrenome')! as FormControl; }
  get dataNascimentoControl()  { return this.form.get('dataNascimento')! as FormControl; }
  get emailControl()           { return this.form.get('email')! as FormControl; }
  get senhaControl()           { return this.form.get('senha')! as FormControl; }
  get confirmarSenhaControl()  { return this.form.get('confirmarSenha')! as FormControl; }
  get roleControl()            { return this.form.get('role')! as FormControl; }
  get termosControl()          { return this.form.get('termos')! as FormControl; }
}