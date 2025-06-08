import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-primary-md',
  imports: [],
  templateUrl: './button-primary-md.component.html',
  styleUrl: './button-primary-md.component.scss'
})
export class ButtonPrimaryMdComponent {
constructor(private router: Router){}
@Input() text: string = '';
@Input() link: string = '';

onNavigate(): void {
      if(this.link) {
          this.router.navigate([this.link]);
    }
  }
}
