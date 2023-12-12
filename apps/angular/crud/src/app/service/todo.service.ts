import { Injectable, signal } from '@angular/core';
import { Todo } from '../model/todo';
import { HttpClient } from '@angular/common/http';
import { randText } from '@ngneat/falso';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  _todos = signal<Todo[]>([]);
  todos = this._todos.asReadonly();

  constructor(private http: HttpClient) {
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe((todos) => this._todos.set(todos));
  }

  update(todo: Todo) {
    this.http
      .put<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: randText(),
          body: todo.body,
          userId: todo.userId,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .subscribe((todoUpdated) =>
        this._todos.update((value) => [
          ...value.slice(0, value.indexOf(todo)),
          todoUpdated,
          ...value.slice(value.indexOf(todo) + 1),
        ]),
      );
  }
}
