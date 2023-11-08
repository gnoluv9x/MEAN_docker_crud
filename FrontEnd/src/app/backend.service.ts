import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITodo } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class BackendService implements OnInit {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getAllTodos(): Observable<ITodo[]> {
    return this.http.get(this.apiUrl + '/todo/getAll') as Observable<ITodo[]>;
  }

  deleteOneTodo(id: string): Observable<any> {
    return this.http.delete(this.apiUrl + '/todo/' + id);
  }

  createTodo(todo: Pick<ITodo, 'title' | 'status'>): Observable<any> {
    return this.http.post(this.apiUrl + '/todo/create', todo);
  }
}
