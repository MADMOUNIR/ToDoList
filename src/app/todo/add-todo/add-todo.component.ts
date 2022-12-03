import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo.model';
import { ToDoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  constructor(private todoService : ToDoService ,private router : Router) {

   }

  todo = new  Todo();
  ngOnInit(): void {
  }

  OnSubmit() : void {

    this.todoService.addTodo(this.todo);
    this.router.navigate(["todos"]);

  }

}
