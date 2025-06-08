import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { InputPrimaryComponent } from '../input-primary/input-primary.component';
import { ButtonPrimaryMdComponent } from '../button-primary-md/button-primary-md.component';
import { ButtonOutlinedMdComponent } from '../button-outlined-md/button-outlined-md.component';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputPrimaryComponent,
    ButtonPrimaryMdComponent,
    ButtonOutlinedMdComponent,
  ],
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
})
export class FormLoginComponent implements OnInit {
  form!: FormGroup;

  // _guardamos_ os controles em propriedades fortemente tipadas
  get emailControl(): FormControl {
    return this.form.get('email')! as FormControl;
  }
  get senhaControl(): FormControl {
    return this.form.get('senha')! as FormControl;
  }

  constructor(private fb: FormBuilder) {}

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
    console.log('vou logar com', email, senha);
    // chama seu AuthService.login({ email, senha })…
  }
}
