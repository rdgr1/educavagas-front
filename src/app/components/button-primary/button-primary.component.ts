import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-primary',
  imports: [],
  templateUrl: './button-primary.component.html',
  styleUrl: './button-primary.component.scss'
})
export class ButtonPrimaryComponent {
constructor(private router: Router){}
@Input() text: string = '';
@Input() link: string = '';

onNavigate(): void {
      if(this.link) {
          this.router.navigate([this.link]);
    }
  }
}
