import { Component } from '@angular/core';
import { HeroTitleComponent } from "../../components/hero-title/hero-title.component";
import { FormLoginComponent } from "../../components/form-login/form-login.component";

@Component({
  selector: 'app-login',
  imports: [HeroTitleComponent, FormLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
