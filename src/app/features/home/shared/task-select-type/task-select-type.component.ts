import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { TaskType } from '@core/enums/task-type.enum';

@Component({
  selector: 'app-task-select-type',
  imports: [ReactiveFormsModule, CommonModule, MatSelectModule, MatIconModule, MatOptionModule],
  standalone: true,
  templateUrl: './task-select-type.component.html',
  styleUrl: './task-select-type.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskSelectTypeComponent {
  @Input() control!: AbstractControl<any, any> | null;
  typeOptions = Object.values(TaskType);

  getFormControl() {
    return this.control as FormControl;
  }

  getChipTypeClass(value: TaskType): string {
    const colorStatus = {
      [TaskType.BUG]: 'bug-chip',
      [TaskType.TASK]: 'task-chip',
      [TaskType.FEATURE]: 'feature-chip',
      [TaskType.EPIC]: 'epic-chip',
      [TaskType.IMPROVEMENT]: 'improvement-chip',
    };
    return colorStatus[value] || '';
  }
}
