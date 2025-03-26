import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TaskPriority } from '@core/enums/task-priority.enum';

@Component({
  selector: 'app-task-chip-priority',
  imports: [CommonModule],
  standalone: true,
  template: `<a *ngIf="priority" [ngClass]="getChipPriorityClass(priority)">{{ priority }}</a>`,
  styleUrl: './task-chip-priority.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskChipPriorityComponent {
  @Input() priority?: TaskPriority;

  getChipPriorityClass(value: TaskPriority): string {
    const colorPriority = {
      [TaskPriority.LOW]: 'low-priority-chip',
      [TaskPriority.MEDIUM]: 'medium-priority-chip',
      [TaskPriority.HIGH]: 'high-priority-chip',
      [TaskPriority.URGENT]: 'urgent-priority-chip',
    }
    return 'mat-chip ' + (colorPriority[value] || '');
  }
}
