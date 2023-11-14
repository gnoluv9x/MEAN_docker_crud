import { AfterViewChecked, NgModule } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { TodoListingComponent } from './todo-listing/todo-listing.component';
import { TodoCreateComponent } from './todo-create/todo-create.component';
import { RouterModule } from '@angular/router';
import { TodoRoutes } from './todo.routing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [TodoCreateComponent, TodoListingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    RouterModule.forChild(TodoRoutes),
  ],
})
export class TodoModule implements AfterViewChecked {
  ngAfterViewChecked(): void {
    console.log('Debug_here 123');
  }
}
