import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskHistory } from '@core/interfaces/task-history.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TaskHistoryService {
    private apiUrl = 'http://localhost:3000/task-api/task-history/';

    constructor(private http: HttpClient) { }
    private getAuthHeaders(): HttpHeaders {
        const token = sessionStorage.getItem('access_token');
        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        });
    }

    getTaskHistory(taskId: string): Observable<TaskHistory[]> {
        const headers = this.getAuthHeaders();

        return this.http.get<TaskHistory[]>(`${this.apiUrl}task/${taskId}`, { headers });
    }
}
