import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-outlined',
  imports: [],
  templateUrl: './button-outlined.component.html',
  styleUrl: './button-outlined.component.scss'
})
export class ButtonOutlinedComponent {
constructor(private router: Router){}
@Input() text: string = '';
@Input() link: string = '';

onNavigate(): void {
      if(this.link) {
          this.router.navigate([this.link]);
    }
  }
}
