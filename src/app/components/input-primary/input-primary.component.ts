import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  forwardRef,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import {
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-input-primary',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './input-primary.component.html',
  styleUrl: './input-primary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputPrimaryComponent),
    multi: true,
  }]
})
export class InputPrimaryComponent implements ControlValueAccessor{
@Input() label: string = '';
@Input() placeholder: string = '';
@Input() type: 'text' | 'email' | 'password' = 'text';
@Input() required: boolean =  false;
@Input() control: FormControl = new FormControl('');

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.control.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.control.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable();
  }

  // chamado no (blur) do input
  touched() {
    this.onTouched();
  }

}
