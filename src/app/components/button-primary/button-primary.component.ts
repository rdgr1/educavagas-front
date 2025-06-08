import { Component, Input } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button-primary',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './button-primary.component.html',
  styleUrls: ['./button-primary.component.scss']
})
export class ButtonPrimaryComponent {
  @Input() text = '';
  @Input() link = '';

  constructor(private router: Router) {}

  onNavigate(): void {
    if (this.link) {
      this.router.navigateByUrl(this.link);
    }
  }
}