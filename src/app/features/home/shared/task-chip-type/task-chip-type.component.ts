import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TaskType } from '@core/enums/task-type.enum';

@Component({
  selector: 'app-task-chip-type',
  imports: [CommonModule],
  standalone: true,
  template: `<a *ngIf="type" [ngClass]="getChipTypeClass(type)">{{ type }}</a>`,
  styleUrl: './task-chip-type.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskChipTypeComponent {
  @Input() type?: TaskType;

  getChipTypeClass(value: TaskType): string {
    const colorStatus = {
      [TaskType.BUG]: 'bug-chip',
      [TaskType.TASK]: 'task-chip',
      [TaskType.FEATURE]: 'feature-chip',
      [TaskType.EPIC]: 'epic-chip',
      [TaskType.IMPROVEMENT]: 'improvement-chip',
    }
    return 'mat-chip ' + (colorStatus[value] || '');
  }
}
