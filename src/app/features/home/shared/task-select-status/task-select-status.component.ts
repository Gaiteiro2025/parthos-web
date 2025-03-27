import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TaskStatus } from '@core/enums/task-status.enum';

@Component({
  selector: 'app-task-select-status',
  imports: [ReactiveFormsModule, CommonModule, MatSelectModule],
  standalone: true,
  templateUrl: './task-select-status.component.html',
  styleUrl: './task-select-status.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskSelectStatusComponent {
  @Input() control!: AbstractControl<any, any> | null;
  statusOptions = Object.values(TaskStatus);

  getFormControl() {
    return this.control as FormControl;
  }

  getChipStatusClass(value: TaskStatus): string {
    const colorStatus = {
      [TaskStatus.TODO]: 'todo-chip',
      [TaskStatus.IN_PROGRESS]: 'in-progress-chip',
      [TaskStatus.IN_REVIEW]: 'in-review-chip',
      [TaskStatus.DONE]: 'done-chip',
      [TaskStatus.BLOCKED]: 'blocked-chip',
    };
    return colorStatus[value] || '';
  }
}
