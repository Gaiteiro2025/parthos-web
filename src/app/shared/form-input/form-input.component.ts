import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormInput } from '../../core/interfaces/form-input.interface';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div *ngIf="formInput && control" [class]="formInput.classGroup">
      <input
        [class]="formInput.class"
        [type]="formInput.type || 'text'"
        [placeholder]="formInput.placeholder"
        [formControl]="getFormControl()"
      />
      <div *ngIf="getFormControl()?.invalid && getFormControl()?.touched">
        <small>{{ formInput.textError }}</small>
      </div>
    </div>
  `,
  styleUrls: ['./form-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormInputComponent {
  @Input() formInput?: FormInput;
  @Input() control?: AbstractControl<any, any>; // Atualizado para permitir `null`

  getFormControl() {
    return this.control as FormControl;
  }
}
