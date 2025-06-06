import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { IndexComponent } from "./pages/index/index.component";

@Component({
  selector: 'app-root',
  imports:  [IndexComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'educavagas-front';
}
