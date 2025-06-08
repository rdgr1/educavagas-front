import { Component, Input } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button-outlined',
  imports: [RouterModule,CommonModule],
  templateUrl: './button-outlined.component.html',
  styleUrl: './button-outlined.component.scss'
})
export class ButtonOutlinedComponent {
  @Input() text = '';
  @Input() link = '';

  constructor(private router: Router) {}

  onNavigate(): void {
    if (this.link) {
      this.router.navigateByUrl(this.link);
    }
  }
}
