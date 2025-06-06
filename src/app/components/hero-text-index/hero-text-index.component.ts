import { Component } from '@angular/core';
import { ButtonPrimaryMdComponent } from "../button-primary-md/button-primary-md.component";
import { ButtonOutlinedMdComponent } from "../button-outlined-md/button-outlined-md.component";

@Component({
  selector: 'app-hero-text-index',
  imports: [ ButtonOutlinedMdComponent, ButtonPrimaryMdComponent, ButtonOutlinedMdComponent],
  templateUrl: './hero-text-index.component.html',
  styleUrl: './hero-text-index.component.scss'
})
export class HeroTextIndexComponent {

}
