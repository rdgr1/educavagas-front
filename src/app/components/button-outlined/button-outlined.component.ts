import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-outlined',
  imports: [],
  templateUrl: './button-outlined.component.html',
  styleUrl: './button-outlined.component.scss'
})
export class ButtonOutlinedComponent {
@Input() text: string = '';

}
