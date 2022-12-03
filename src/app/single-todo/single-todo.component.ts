import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '../models/todo.model';
import { ToDoService } from '../services/todo.service';

@Component({
  selector: 'app-single-todo',
  templateUrl: './single-todo.component.html',
  styleUrls: ['./single-todo.component.css']
})
export class SingleTodoComponent implements OnInit {

  //declaration
  todo ;
  erreur;

  //constructeur
  constructor(private route : ActivatedRoute ,
    private todoService : ToDoService,
    ) { }

  ngOnInit(): void {

    const id = +this.route.snapshot.params['id'];
    this.todo = this.todoService.getTodo(id);
    if(!this.todo) {
      this.erreur = "Projet inexistant !"
    }
  }

}
