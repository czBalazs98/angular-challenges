import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Todo } from './model/todo';
import { TodoService } from './service/todo.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngFor="let todo of todos()">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos = this.todoService.todos;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  update(todo: Todo) {
    this.todoService.update(todo);
  }
}
