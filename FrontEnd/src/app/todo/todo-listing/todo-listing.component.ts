import { AfterViewChecked, Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';
import { ITodo } from 'src/types';

@Component({
  selector: 'app-todo-listing',
  templateUrl: './todo-listing.component.html',
  styleUrls: ['./todo-listing.component.scss'],
})
export class TodoListingComponent implements OnInit, AfterViewChecked, OnDestroy {
  public displayedColumns: string[] = ['index', 'title', 'status', 'id'];
  public dataSource = new MatTableDataSource<ITodo>();
  public pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 };
  private subscriptions = new Subscription();

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
    this.todoService.retrieveTodo();
    this.refreshTodo();
  }

  refreshTodo() {
    const subscription = this.todoService.listTodo$.subscribe(data => {
      if (data.length === 0) {
        this.dataSource.data = [];
      } else {
        this.dataSource.data = data;
      }
      this.dataSource.paginator = this.paginator;
    });

    this.subscriptions.add(subscription);
  }

  public handleRemove(id: string) {
    this.todoService.deleteOne(id);
  }

  ngAfterViewChecked(): void {
    console.log('Debug_here this.pageEvent : ', this.pageEvent);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getPaginatorData(event: PageEvent): PageEvent {
    return event;
  }
}
