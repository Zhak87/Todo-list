import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  createTask(task: any): Observable<any> {
    return this.http.post(this.baseUrl, task);
  }

  updateTask(id: number, task: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  completeTask(id: number, completed: boolean): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, { completed });
  }

  getTaskById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
