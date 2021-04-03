import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToDo } from '../models/todo.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class DashboardService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getTodos(userId: number = 1): Observable<ToDo[]> {
    return this.http
      .get<ToDo[]>(`${this.baseUrl}/todos`, {
        params: {
          userId: String(userId),
        },
      })
      .pipe(
        map((todo) =>
          todo.map((entry) => ({
            ...entry,
            parentId: 1,
          }))
        )
      );
  }

  updateTodo(id: number, status: boolean): Observable<Partial<ToDo>> {
    return this.http.put<Partial<ToDo>>(`${this.baseUrl}/todos/${id}`, {
      completed: status,
    });
  }
}
