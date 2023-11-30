import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITodo, ITodoResponse } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllTodos(): Observable<ITodo[]> {
    return (this.http.get(this.apiUrl + '/todo/getAll') as Observable<ITodo[]>).pipe(delay(3000));
  }

  deleteOneTodo(id: string): Observable<ITodoResponse<{ msg: string }>> {
    return this.http.delete(this.apiUrl + '/todo/' + id) as Observable<ITodoResponse<{ msg: string }>>;
  }

  createTodo(todo: Pick<ITodo, 'title' | 'status'>): Observable<ITodoResponse<{ msg: string }>> {
    return this.http.post(this.apiUrl + '/todo/create', todo) as Observable<ITodoResponse<{ msg: string }>>;
  }
}
