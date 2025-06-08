import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero-title',
  imports: [CommonModule],
  templateUrl: './hero-title.component.html',
  styleUrl: './hero-title.component.scss'
})
export class HeroTitleComponent {
@Input() text: string = '';
}
