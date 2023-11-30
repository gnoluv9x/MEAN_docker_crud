import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ITodo } from 'src/types';
import { TodoService } from '../services/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  public todos$: Observable<ITodo[]>;
  public todoForm!: FormGroup;

  constructor(
    private todoService: TodoService,
    private fb: FormBuilder
  ) {
    this.todos$ = this.todoService.listTodos$;
  }

  ngOnInit(): void {
    this.todoForm = this.fb.group(
      {
        title: ['New title', Validators.required],
        status: ['new', Validators.required],
      },
      {
        updateOn: 'submit',
      }
    );
  }

  public deleteTodo(id: string) {
    this.todoService.deleteOne(id);
  }

  public onSubmit(formValue: FormGroup) {
    const todo: Pick<ITodo, 'status' | 'title'> = {
      status: formValue.value.status,
      title: formValue.value.title,
    };

    this.todoService.create(todo);
  }
}
