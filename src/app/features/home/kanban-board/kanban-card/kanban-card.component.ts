import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { TaskPriority } from '@core/enums/task-priority.enum';
import { TaskType } from '@core/enums/task-type.enum';
import { Task } from '@core/interfaces/task.interface';

@Component({
  selector: 'app-kanban-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule,],
  templateUrl: './kanban-card.component.html',
  styleUrl: './kanban-card.component.scss',
})
export class KanbanCardComponent {
  @Input() task?: Task;

  getChipPriorityClass(value: TaskPriority): string {
    const colorPriority = {
      [TaskPriority.LOW]: 'low-priority-chip',
      [TaskPriority.MEDIUM]: 'medium-priority-chip',
      [TaskPriority.HIGH]: 'high-priority-chip',
      [TaskPriority.URGENT]: 'high-priority-chip',
    }
    return colorPriority[value] || '';
  }

  getChipTypeClass(value: TaskType): string {
    const colorStatus = {
      [TaskType.BUG]: 'bug-chip',
      [TaskType.TASK]: 'feature-chip',
      [TaskType.FEATURE]: 'feature-chip',
      [TaskType.EPIC]: 'feature-chip',
      [TaskType.IMPROVEMENT]: 'improvement-chip',
    }
    return colorStatus[value] || '';
  }
}
