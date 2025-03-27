import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TaskPriority } from '@core/enums/task-priority.enum';

@Component({
  selector: 'app-task-select-priority',
  imports: [ReactiveFormsModule, CommonModule, MatSelectModule],
  standalone: true,
  templateUrl: './task-select-priority.component.html',
  styleUrl: './task-select-priority.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskSelectPriorityComponent {
  @Input() control!: AbstractControl<any, any> | null;
  priorityOptions = Object.values(TaskPriority);

  getFormControl() {
    return this.control as FormControl;
  }

  getChipPriorityClass(value: TaskPriority): string {
    const colorPriority = {
      [TaskPriority.LOW]: 'low-priority-chip',
      [TaskPriority.MEDIUM]: 'medium-priority-chip',
      [TaskPriority.HIGH]: 'high-priority-chip',
      [TaskPriority.URGENT]: 'urgent-priority-chip',
    };
    return colorPriority[value] || '';
  }
}
