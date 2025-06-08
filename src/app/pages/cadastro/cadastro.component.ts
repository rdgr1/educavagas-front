import { Component } from '@angular/core';
import { HeroTitleComponent } from "../../components/hero-title/hero-title.component";
import { FormCadastroComponent } from "../../components/form-cadastro/form-cadastro.component";

@Component({
  selector: 'app-cadastro',
  imports: [HeroTitleComponent, FormCadastroComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {

}
