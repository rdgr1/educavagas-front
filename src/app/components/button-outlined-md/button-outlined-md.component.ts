import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-outlined-md',
  imports: [],
  templateUrl: './button-outlined-md.component.html',
  styleUrl: './button-outlined-md.component.scss'
})
export class ButtonOutlinedMdComponent {
@Input() text: string = '';
}
