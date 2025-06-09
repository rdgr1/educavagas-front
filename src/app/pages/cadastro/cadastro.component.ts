import { Component } from '@angular/core';
import { HeroTitleComponent } from "../../components/hero-title/hero-title.component";
import { FormCadastroComponent } from "../../components/form-cadastro/form-cadastro.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  imports: [HeroTitleComponent, FormCadastroComponent,CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {

}
