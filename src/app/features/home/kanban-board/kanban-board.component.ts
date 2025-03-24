import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TaskStatus } from '@core/enums/task-status.enum';
import { User } from '@core/interfaces/user.interface';
import { AuthService } from '@core/services/auth/auth.service';
import { TaskService } from '@core/services/task/task.service';
import { ToastrModule } from 'ngx-toastr';
import { Task } from '../../../core/interfaces/task.interface';
import { TaskDialogComponent } from '../shared/task-dialog/task-dialog.component';
import { KanbanCardComponent } from './kanban-card/kanban-card.component';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule, DragDropModule, MatButtonModule, KanbanCardComponent, MatProgressSpinnerModule, ToastrModule],
  providers: [
    provideAnimations()
  ],
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss'],
})
export class KanbanBoardComponent {
  user: User | null;
  isLoading = false;

  constructor(private dialog: MatDialog, private taskService: TaskService, private authService: AuthService) {
    this.user = this.authService.getUser();
  }
  statuses: TaskStatus[] = [TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE];
  tasks: Task[] = [];

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    if (!this.user?.id) return
    this.isLoading = true;
    this.taskService.findByUserId(this.user.id).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.isLoading = false
      },
      error: (err) => console.error(err),
      complete: () => this.isLoading = false
    });
  }

  getTasksByStatus(status: TaskStatus): Task[] {
    return this.tasks.filter((task) => task.status === status);
  }

  openCreateTaskDialog(status: TaskStatus): void {
    this.dialog.open(TaskDialogComponent, {
      width: '50vw',
      maxWidth: '90vw',
      data: { status }
    }).afterClosed();
  }
  openTaskDialog(task: Task): void {
    this.dialog.open(TaskDialogComponent, {
      width: '50vw',
      height: '80%',
      maxWidth: '90vw',
      data: task
    }).afterClosed();
  }

  async onDrop(event: CdkDragDrop<Task[]>, status: TaskStatus): Promise<void> {
    try {
      const { previousIndex, currentIndex, item } = event;
      const movedTask = item.data;
      if (!movedTask) return;
      movedTask.status = status;

      moveItemInArray(this.getTasksByStatus(movedTask.status), previousIndex, currentIndex);
      await this.updateTaskStatus(movedTask);
    } catch (error) {
      console.error(error)
    }
  }

  async updateTaskStatus(task: Task): Promise<void> {
    try {
      await this.taskService.update(task.id, {
        status: task.status,
      });
      console.log('Status da tarefa atualizado com sucesso:', task.status);

    } catch (error) {
      console.error('Erro ao atualizar o status da tarefa:', error);

    }
  }

  connectedTo(statuses: TaskStatus[], status: TaskStatus): TaskStatus[] {
    return statuses.filter(s => s !== status);
  }
}
