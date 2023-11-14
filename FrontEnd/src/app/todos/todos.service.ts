import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  startWith,
  takeUntil,
} from 'rxjs';
import { BackendService } from '../backend.service';
import { ITodo } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class TodoService implements OnInit, OnDestroy {
  private _todoSubject$ = new BehaviorSubject<ITodo[]>([]);
  todo$: Observable<ITodo[]> = this._todoSubject$.asObservable();
  private subscriptions = new Subscription();
  public randomNumber = Math.random() * 1000;

  constructor(private backend: BackendService) {
    console.log('Debug_here backend: ', backend);
    this.getAll();
  }

  ngOnInit(): void {}

  getAll(): void {
    const subscription = this.backend.getAllTodos().subscribe((data) => {
      this._todoSubject$.next(data);
    });

    this.subscriptions.add(subscription);
  }

  deleteOne(id: string): void {
    this.backend.deleteOneTodo(id).subscribe({
      next: (resp) => {
        console.log('Debug_here resp: ', resp);
        this.getAll();
      },
      error: (error) => {
        console.log('Debug_here error: ', error);
      },
    });
  }

  create(todo: Pick<ITodo, 'title' | 'status'>): void {
    this.backend.createTodo(todo).subscribe({
      next: (resp) => {
        if (resp.status === 'success') {
          this.getAll();
        } else {
          throw resp?.msg || 'Tạo thất bại';
        }
      },
      error(err) {
        console.log('Debug_here err');
      },
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
