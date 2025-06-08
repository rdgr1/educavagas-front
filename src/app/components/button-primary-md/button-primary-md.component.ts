// button-primary-md.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-primary-md',
  imports: [CommonModule],
  standalone: true,
  template: `
    <div class="container">
      <button
        [type]="type"
        [disabled]="disabled"
        (click)="onNavigate()"
      >
        <ng-content *ngIf="!text"></ng-content>
        <span *ngIf="text">{{ text }}</span>
      </button>
    </div>
  `,
  styleUrls: ['./button-primary-md.component.scss']
})
export class ButtonPrimaryMdComponent {
  @Input() text = '';
  @Input() link = '';
  @Input() type: 'button'|'submit'|'reset' = 'button';
  @Input() disabled = false;

  constructor(private router: Router) {}

  onNavigate(): void {
    if (this.link) {
      this.router.navigate([this.link]);
    }
  }
}