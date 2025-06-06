import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-primary-md',
  imports: [],
  templateUrl: './button-primary-md.component.html',
  styleUrl: './button-primary-md.component.scss'
})
export class ButtonPrimaryMdComponent {
@Input() text: string = '';
}
