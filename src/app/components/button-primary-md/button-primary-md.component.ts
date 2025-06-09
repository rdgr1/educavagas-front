import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-primary-md',
  standalone: true,
  imports: [CommonModule],
  template: `
      <div class="container"><button
      [type]="type"
      [disabled]="disabled"
      (click)="handleClick($event)"
      class="btn-primary-md"
    >
      <ng-content *ngIf="!text"></ng-content>
      <span *ngIf="text">{{ text }}</span>
    </button></div>
  `,
  styleUrls: ['./button-primary-md.component.scss']
})
export class ButtonPrimaryMdComponent {
  /** Texto interno do botão */
  @Input() text = '';
  /** Rota a navegar (só usada se type==='button') */
  @Input() link = '';
  /** 'button' | 'submit' | 'reset' */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;

  constructor(private router: Router) {}

  handleClick(event: Event): void {
    // Se for botão normal (type="button") e tiver link, navega
    if (this.type === 'button' && this.link) {
      event.preventDefault();
      this.router.navigate([ this.link ]);
    }
    // se type for 'submit' ou 'reset', deixamos o form cuidar disso
  }
}