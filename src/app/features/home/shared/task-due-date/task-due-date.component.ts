import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MY_DATE_FORMATS } from '../../../../core/MY_DATE_FORMATS';

@Component({
  selector: 'app-task-due-date',
  imports: [CommonModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule],
  standalone: true,
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  templateUrl: './task-due-date.component.html',
  styleUrl: './task-due-date.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDueDateComponent {
  @Input() control!: AbstractControl<any, any> | null;

  getFormControl() {
    return this.control as FormControl;
  }

  getDateClass(): string {
    const selectedDate = this.getFormControl().value;
    if (!selectedDate) return '';

    const today = new Date();
    const dueDate = new Date(selectedDate);
    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (dueDate < today) {
      return 'due-date-overdue';
    } else if (dueDate.getTime() === today.getTime()) {
      return 'due-date-today';
    } else {
      return 'due-date-future';
    }
  }
}
