import { Routes } from '@angular/router';
import { TodoCreateComponent } from './todo-create/todo-create.component';
import { TodoListingComponent } from './todo-listing/todo-listing.component';

export const TodoRoutes: Routes = [
  {
    path: '',
    component: TodoCreateComponent,
    data: { title: 'Todo create' },
    children: [
      {
        path: 'todo/listing',
        component: TodoListingComponent,
        data: { title: 'Todo listing' },
      },
    ],
  },
];
