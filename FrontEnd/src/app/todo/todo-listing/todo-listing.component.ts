import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TodoService } from 'src/app/services/todos.service';
import { ILoadingState, ITodo } from 'src/types';

@Component({
  selector: 'app-todo-listing',
  templateUrl: './todo-listing.component.html',
  styleUrls: ['./todo-listing.component.scss'],
})
export class TodoListingComponent implements OnInit, AfterViewChecked {
  public displayedColumns: string[] = ['index', 'title', 'status', 'id'];
  public dataSource = new MatTableDataSource<ITodo>();
  public loading$: Observable<ILoadingState> = this.todoService.loading$;
  public pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 };

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('loadingTempl', { static: true, read: ViewContainerRef })
  loadingTempl!: ViewContainerRef;

  constructor(
    private todoService: TodoService,
    private title: Title,
    private router: ActivatedRoute
  ) {
    // update page title
    (this.router.data as Observable<{ title: string }>).subscribe(titleData => {
      this.title.setTitle(titleData.title);
    });
  }
  ngOnInit(): void {
    this.refreshTodo();
  }

  refreshTodo() {
    this.todoService.listTodos$.subscribe(data => {
      if (data.length === 0) {
        this.dataSource.data = [];
      } else {
        const newListTodos = data.map((item, idx) => ({ ...item, index: idx + 1 }));
        this.dataSource.data = newListTodos;
      }
      this.dataSource.paginator = this.paginator;
    });
  }

  public handleRemove(id: string) {
    this.todoService.deleteOne(id);
  }

  ngAfterViewChecked(): void {
    console.log('Debug_here this.pageEvent : ', this.pageEvent);
  }

  getPaginatorData(event: PageEvent): PageEvent {
    return event;
  }
}
