import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { TaskHistory } from '@core/interfaces/task-history.interface';
import { TaskHistoryService } from '@core/services/task-history/task-history.service';
import { TranslateActionPipe } from '@core/translate-action.pipe';
@Component({
  selector: 'app-task-history',
  standalone: true,
  imports: [MatListModule, CommonModule, TranslateActionPipe, MatStepperModule, MatButtonModule, MatIconModule],
  templateUrl: './task-history.component.html',
  styleUrls: ['./task-history.component.scss'],
})
export class TaskHistoryComponent implements OnInit {
  @Input() taskId!: string;
  taskHistories: TaskHistory[] = [];

  constructor(private taskHistoryService: TaskHistoryService) { }

  ngOnInit(): void {
    this.loadTaskHistory();
  }

  loadTaskHistory(): void {
    this.taskHistoryService.getTaskHistory(this.taskId).subscribe((history) => {
      this.taskHistories = history;
    });
  }
}