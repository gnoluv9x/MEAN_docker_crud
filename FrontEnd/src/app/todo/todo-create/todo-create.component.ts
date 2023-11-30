import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { TodoService } from 'src/app/services/todos.service';
import { ILoadingState, IStatus } from 'src/types';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss'],
})
export class TodoCreateComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  public loading$: Observable<ILoadingState> = this.todoService.loading$;

  todoForm!: FormGroup;
  listStatus: IStatus[] = [
    {
      name: 'New',
      value: 'new',
    },
    {
      name: 'Completed',
      value: 'completed',
    },
    {
      name: 'Doing',
      value: 'doing',
    },
  ];

  constructor(
    private router: ActivatedRoute,
    private titleService: Title,
    private fb: FormBuilder,
    private todoService: TodoService
  ) {
    this.todoForm = this.fb.group({
      title: ['title', Validators.required],
      status: ['new', Validators.required],
    });
  }

  ngOnInit(): void {
    this.subscriptions = (this.router.data as Observable<{ title: string }>).subscribe(data => {
      this.titleService.setTitle(data.title);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  handleSubmit() {
    const title = this.todoForm.value.title;
    const status = this.todoForm.value.status;
    const post = { title, status };

    this.todoService.create(post);
  }
}
