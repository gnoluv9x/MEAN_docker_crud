import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TodoService } from 'src/app/todos/todos.service';
import { ITodo } from 'src/types';

@Component({
  selector: 'app-todo-listing',
  templateUrl: './todo-listing.component.html',
  styleUrls: ['./todo-listing.component.scss'],
})
export class TodoListingComponent {
  displayedColumns: string[] = ['index', 'title', 'status'];
  dataSource = new MatTableDataSource<ITodo>();

  constructor(
    private todoService: TodoService,
    private title: Title,
    private router: ActivatedRoute
  ) {
    this.todoService.todo$.subscribe((listTodo) => {
      if (listTodo.length > 0) {
        const newTodo = listTodo.map((todo, idx) => ({
          ...todo,
          index: idx + 1,
        }));

        this.dataSource.data = newTodo;
      } else {
        this.dataSource.data = listTodo;
      }
    });

    // update page title
    (this.router.data as Observable<{ title: string }>).subscribe(
      (titleData) => {
        this.title.setTitle(titleData.title);
      }
    );
  }
}
