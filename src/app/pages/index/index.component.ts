import { Component } from '@angular/core';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { HeroTextIndexComponent } from "../../components/hero-text-index/hero-text-index.component";

@Component({
  selector: 'app-index',
  imports: [ HeroTextIndexComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

}
