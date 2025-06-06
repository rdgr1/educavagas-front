import { Component } from '@angular/core';
import { ButtonPrimaryComponent } from "../button-primary/button-primary.component";
import { ButtonOutlinedComponent } from "../button-outlined/button-outlined.component";

@Component({
  selector: 'app-nav-bar',
  imports: [ButtonPrimaryComponent, ButtonOutlinedComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

}
