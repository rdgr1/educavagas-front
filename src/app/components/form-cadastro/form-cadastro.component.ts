import { Component, OnInit }    from '@angular/core';
import { CommonModule }          from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Router }                from '@angular/router';
import { ToastrService }         from 'ngx-toastr';

import { InputPrimaryComponent }   from '../input-primary/input-primary.component';
import { ButtonPrimaryMdComponent }from '../button-primary-md/button-primary-md.component';
import { AuthService }             from '../../services/auth.service';
import { ResponsavelRequest, EscolaRequest } from '../../dto/usuario.dto';

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
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nome:            ['', Validators.required],
      sobrenome:       ['', Validators.required],
      dataNascimento:  ['', Validators.required],
      cpf:             ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      email:           ['', [Validators.required, Validators.email]],
      senha:           ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha:  ['', Validators.required],
      endereco:        [''],
      telefone:        [''],
      role:            ['RESPONSÁVEL'],
      termos:          [false, Validators.requiredTrue],
      matricula:       ['']
    }, {
      validators: this.senhasIguais('senha','confirmarSenha')
    });

    // ajusta required de endereco/telefone conforme role
    this.roleControl.valueChanges.subscribe(role => {
      const end = this.enderecoControl;
      const tel = this.telefoneControl;
      if (role === 'RESPONSÁVEL') {
        end.setValidators([Validators.required]);
        tel.setValidators([Validators.required]);
      } else {
        end.clearValidators();
        tel.clearValidators();
      }
      end.updateValueAndValidity();
      tel.updateValueAndValidity();
    });
  }

  private senhasIguais(p:string, c:string) {
    return (g: FormGroup) => {
      const pass    = g.get(p)!;
      const confirm = g.get(c)!;
      confirm.setErrors(pass.value!==confirm.value ? { mismatch:true } : null);
    };
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const fv = this.form.value;
    const nomeCompleto = `${fv.nome} ${fv.sobrenome}`;

    if (fv.role==='RESPONSÁVEL') {
      const dto: ResponsavelRequest = {
        nomeCompleto,
        cpf:      fv.cpf,
        email:    fv.email,
        senha:    fv.senha,
        endereco: fv.endereco,
        telefone: fv.telefone,
        roles:    [fv.role]
      };
      this.auth.registerResponsavel(dto).subscribe({
        next: () => {
          this.toastr.success('Responsável cadastrado com sucesso!');
          this.router.navigate(['/login']);
        },
        error: err => {
          this.toastr.error(err.error?.message||err.message,'Erro no cadastro');
        }
      });

    } else {
      const dto: EscolaRequest = {
        nomeCompleto,
        cpf:      fv.cpf,
        email:    fv.email,
        senha:    fv.senha,
        roles:    [fv.role],
        matricula:fv.matricula
      };
      this.auth.registerEscola(dto).subscribe({
        next: () => {
          this.toastr.success('Usuário escola cadastrado com sucesso!');
          this.router.navigate(['/login']);
        },
        error: err => {
          this.toastr.error(err.error?.message||err.message,'Erro no cadastro');
        }
      });
    }
  }

  // getters para o template
  get nomeControl()          { return this.form.get('nome')! as FormControl; }
  get sobrenomeControl()     { return this.form.get('sobrenome')! as FormControl; }
  get dataNascimentoControl(){ return this.form.get('dataNascimento')! as FormControl; }
  get cpfControl()           { return this.form.get('cpf')! as FormControl; }
  get emailControl()         { return this.form.get('email')! as FormControl; }
  get senhaControl()         { return this.form.get('senha')! as FormControl; }
  get confirmarSenhaControl(){ return this.form.get('confirmarSenha')! as FormControl; }
  get enderecoControl()      { return this.form.get('endereco')! as FormControl; }
  get telefoneControl()      { return this.form.get('telefone')! as FormControl; }
  get roleControl()          { return this.form.get('role')! as FormControl; }
  get termosControl()        { return this.form.get('termos')! as FormControl; }
  get matriculaControl()     { return this.form.get('matricula')! as FormControl; }
}