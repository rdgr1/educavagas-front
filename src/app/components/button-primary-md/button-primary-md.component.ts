import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-primary-md',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <button
        class="btn-primary-md"
        [type]="type"
        [disabled]="disabled"
        (click)="handleClick($event)"
      >
        <ng-content *ngIf="!text"></ng-content>
        <span *ngIf="text">{{ text }}</span>
      </button>
    </div>
  `,
  styleUrls: ['./button-primary-md.component.scss'],
})
export class ButtonPrimaryMdComponent {
  /** Texto interno do botão; se vazio, renderiza `<ng-content>` */
  @Input() text = '';

  /** Rota para navegação (usado somente em type="button") */
  @Input() link = '';

  /** 'button' | 'submit' | 'reset' */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  /** Desabilita o botão */
  @Input() disabled = false;

  constructor(private router: Router) {}

  handleClick(event: MouseEvent) {
    // Se for um botão de navegação
    if (this.type === 'button' && this.link) {
      event.preventDefault();
      this.router.navigateByUrl(this.link);
    }
    // submit/reset deixam o form lidar com o evento
  }
}
