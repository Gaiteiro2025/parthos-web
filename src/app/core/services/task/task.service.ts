import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTaskDto } from '@core/interfaces/create-task-dto.interface';
import { Task } from '@core/interfaces/task.interface';
import { UpdateTaskDto } from '@core/interfaces/update-task-dto.interface';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { NotificationService } from '../notification.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = 'http://localhost:3000/task-api/task/';
  private taskSubject = new BehaviorSubject<Task[]>([]);
  task$ = this.taskSubject.asObservable();

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {
  }

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  async create(task: CreateTaskDto): Promise<Task> {
    try {
      const headers = this.getAuthHeaders();
      const newTask = await firstValueFrom(
        this.http.post<Task>(this.baseUrl, task, { headers })
      );
      this.notificationService.success('Tarefa criada com sucesso!');

      const currentTasks = this.taskSubject.value;
      this.taskSubject.next([...currentTasks, newTask]);
      return newTask;
    } catch (error) {
      console.error('Erro na criação:', error);
      this.notificationService.error('Erro ao criar tarefa.');
      throw error;
    }
  }

  async findByUserId(userId: string): Promise<void> {
    try {
      const headers = this.getAuthHeaders();
      const tasks = await firstValueFrom(this.http.get<Task[]>(`${this.baseUrl}user/${userId}`, { headers }));
      this.taskSubject.next(tasks);
    } catch (error) {
      console.error('Erro ao obter tarefas por usuário:', error);
      this.notificationService.error('Erro ao obter tarefas.');
      throw error;
    }
  }

  async findOne(id: string): Promise<Task> {
    try {
      const headers = this.getAuthHeaders();
      const task = await firstValueFrom(
        this.http.get<Task>(`${this.baseUrl}${id}`, { headers })
      );
      return task;
    } catch (error) {
      console.error('Erro ao obter tarefa:', error);
      this.notificationService.error('Erro ao obter tarefa.');
      throw error;
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
      const headers = this.getAuthHeaders();
      const updatedTask = await firstValueFrom(
        this.http.patch<Task>(`${this.baseUrl}${id}`, updateTaskDto, { headers })
      );
      this.notificationService.success('Tarefa atualizada com sucesso!');

      const currentTasks = this.taskSubject.value;
      const index = currentTasks.findIndex(task => task.id === id);
      if (index !== -1) {
        currentTasks[index] = updatedTask;
        this.taskSubject.next([...currentTasks]);
      }

      return updatedTask;
    } catch (error) {
      console.error('Erro na atualização:', error);
      this.notificationService.error('Erro ao atualizar tarefa.');
      throw error;
    }
  }

  async remove(id: string): Promise<Task> {
    try {
      const headers = this.getAuthHeaders();
      const removedTask = await firstValueFrom(
        this.http.delete<Task>(`${this.baseUrl}${id}`, { headers })
      );
      this.notificationService.success('Tarefa removida com sucesso!');

      const currentTasks = this.taskSubject.value;
      this.taskSubject.next(currentTasks.filter(task => task.id !== id));

      return removedTask;
    } catch (error) {
      console.error('Erro na remoção:', error);
      this.notificationService.error('Erro ao remover tarefa.');
      throw error;
    }
  }
}
