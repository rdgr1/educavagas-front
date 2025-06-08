import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-outlined-md',
  imports: [],
  templateUrl: './button-outlined-md.component.html',
  styleUrl: './button-outlined-md.component.scss'
})
export class ButtonOutlinedMdComponent {
constructor(private router: Router){}
@Input() text: string = '';
@Input() link: string = '';

onNavigate(): void {
      if(this.link) {
          this.router.navigate([this.link]);
    }
  }
}
