import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from './todos.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ITodo } from 'src/types';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todo$!: Observable<any>;
  public todoForm!: FormGroup;

  constructor(public todoService: TodoService, private fb: FormBuilder) {
    this.todo$ = this.todoService.todo$;
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
