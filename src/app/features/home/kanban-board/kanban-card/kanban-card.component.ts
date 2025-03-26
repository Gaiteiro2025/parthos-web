import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Task } from '@core/interfaces/task.interface';
import { TaskChipTypeComponent } from '../../shared/task-chip-type/task-chip-type.component';
import { TaskChipPriorityComponent } from '../../shared/task-chip/task-chip-priority.component';

@Component({
  selector: 'app-kanban-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, TaskChipTypeComponent, TaskChipPriorityComponent],
  templateUrl: './kanban-card.component.html',
  styleUrl: './kanban-card.component.scss',
})
export class KanbanCardComponent {
  @Input() task?: Task;
}
