import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription, finalize } from 'rxjs';
import { ILoadingState, ITodo } from 'src/types';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService implements OnDestroy {
  private subscriptions = new Subscription();
  private loadingSubject$ = new BehaviorSubject<ILoadingState>('idle');
  private listTodosSubject = new BehaviorSubject<ITodo[]>([]);

  public listTodos$ = this.listTodosSubject.asObservable();
  public loading$ = this.loadingSubject$.asObservable();
  public randomNumber = Math.random() * 1000;

  constructor(private backend: BackendService) {
    this.getAll();
  }

  getAll(): void {
    this.loadingSubject$.next('listing');
    const subscription = this.backend
      .getAllTodos()
      .pipe(finalize(() => this.loadingSubject$.next('idle')))
      .subscribe(data => {
        this.listTodosSubject.next(data);
      });
    this.subscriptions.add(subscription);
  }

  deleteOne(id: string): void {
    this.loadingSubject$.next('deleting');
    this.backend
      .deleteOneTodo(id)
      .pipe(finalize(() => this.loadingSubject$.next('idle')))
      .subscribe({
        next: () => {
          this.getAll();
        },
        error: error => {
          console.log('Debug_here error: ', error);
        },
      });
  }

  create(todo: Pick<ITodo, 'title' | 'status'>): void {
    this.loadingSubject$.next('creating');
    this.backend
      .createTodo(todo)
      .pipe(finalize(() => this.loadingSubject$.next('idle')))
      .subscribe({
        next: resp => {
          if (resp.status === 'success') {
            this.getAll();
          } else {
            throw resp['msg'] || 'Tạo thất bại';
          }
        },
        error(err) {
          console.log('Debug_here err: ', err);
        },
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
