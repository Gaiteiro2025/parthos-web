import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-title',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './task-title.component.html',
  styleUrls: ['./task-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskTitleComponent {
  @Input() control!: AbstractControl<any, any> | null;
  editing = false;
  private originalValue = '';

  getFormControl() {
    return this.control as FormControl;
  }

  toggleEditing() {
    this.originalValue = this.getFormControl().value;
    this.editing = true;
  }

  saveOrCancelEdit() {
    this.editing = false;
    this.getFormControl().updateValueAndValidity();

  }

  cancelEditing(event: Event) {
    event.preventDefault();
    this.getFormControl().patchValue(this.originalValue, { emitEvent: true });
    this.getFormControl().updateValueAndValidity();
    this.editing = false;
  }
}
