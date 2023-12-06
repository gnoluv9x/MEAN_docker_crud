import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITodo } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private listTodoSub = new BehaviorSubject<ITodo[]>([]);
  public listTodo$: Observable<ITodo[]> = this.listTodoSub.asObservable();

  constructor(private backendService: BackendService) {}

  public retrieveTodo(): void {
    this.backendService.getAll().subscribe({
      next: data => this.listTodoSub.next(data),
      error: e => console.error(e),
    });
  }

  deleteOne(id: string) {
    this.backendService.deleteOne(id).subscribe({ next: () => this.retrieveTodo() });
  }

  create(todo: Pick<ITodo, 'title' | 'status'>) {
    this.backendService.create(todo).subscribe({ next: () => this.retrieveTodo() });
  }
}
