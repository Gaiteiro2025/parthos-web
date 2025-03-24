import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TaskPriority } from '@core/enums/task-priority.enum';
import { TaskStatus } from '@core/enums/task-status.enum';
import { TaskType } from '@core/enums/task-type.enum';
import { Task } from '@core/interfaces/task.interface';
import { User } from '@core/interfaces/user-auth.interface';
import { AuthService } from '@core/services/auth/auth.service';
import { TaskService } from '@core/services/task/task.service';

@Component({
  selector: 'app-create-task-dialog',
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDialogModule, MatOptionModule, MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  standalone: true,
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDialogComponent {
  taskForm: FormGroup;
  statusOptions = Object.values(TaskStatus);
  priorityOptions = Object.values(TaskPriority);
  typeOptions = Object.values(TaskType);
  user: User | null;
  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    private fb: FormBuilder,
    private taskService: TaskService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Task>
  ) {
    this.user = this.authService.getUser()
    this.taskForm = this.fb.group({
      title: [data.title || '', Validators.required],
      description: [data.description || '', Validators.required],
      type: [data.type || TaskType.TASK, Validators.required],
      status: [data.status || TaskStatus.TODO, Validators.required],
      priority: [TaskPriority.MEDIUM, Validators.required],
      dueDate: [data.dueDate || null],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onSubmit(): Promise<void> {
    if (!this.taskForm.valid) return;
    if (!this.user) return;
    try {
      if (!this.data.id) {
        const response = await this.taskService.create({ ...this.taskForm.value, assign: this.user.id });
        this.dialogRef.close(response);
      } else {
        const response = await this.taskService.update(this.data.id, this.taskForm.value);
        this.dialogRef.close(response);
      }
    } catch (error) {
      console.error(error)
    }

  }
}