import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Todo } from './../models/todo.model';

@Injectable()
export class ToDoService {
 today = new Date();
 todos : Todo[];
 todoSubject = new Subject<any[]>();

 constructor(private httpClient : HttpClient) {

    //----------------------------------------------------
    //----Récupération des données from server------------
    //-----------------------------------------------------
    this.getTodoFromServer();

    //----------------------------------------------------
    //----Récupération static des données------------------
    //-----------------------------------------------------

  //  setTimeout(
  //    ()=>{
  //       this.todos = [
  //         {
  //           todoName : "Project 1",
  //           todoStatus : false ,
  //           image : "/assets/img/projetct1.jpg",
  //           todoDesc : "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
  //           isModif : false
  //         },
  //         {
  //           todoName : "Project 2",
  //           todoStatus : true ,
  //           image : "/assets/img/projetct2.jpg",
  //           todoDesc : "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
  //           isModif : false
  //         },
  //         {
  //           todoName : "Project 3",
  //           todoStatus : true ,
  //           image : "/assets/img/projetct3.jpg",
  //           todoDesc : "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
  //           isModif : false
  //         },
  //         {
  //           todoName : "Project 4",
  //           todoStatus : true ,
  //           image : "/assets/img/projetct4.jpg",
  //           todoDesc : "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
  //           isModif : false
  //         }
  //        ];
  //        this.emitTodos();
  //    } , 2000
  //  );
 }

 emitTodos() {
    this.todoSubject.next(this.todos);

 }


   onchangeStatus(i:number)
   {
     this.todos[i].todoStatus = ! this.todos[i].todoStatus ;
     this.emitTodos();
     this.saveTodoInServer();
   }

   onchangeIsModif(i : number)
   {
      this.todos[i].isModif = ! this.todos[i].isModif  ;
      this.emitTodos();
      this.saveTodoInServer();
   }

   //----récuprer un ToDo
   getTodo(i : number)
   {
     if(this.todos[i])
     {
       return this.todos[i];
     }
     else return false;
    }

    //----Ajouter un ToDo
    addTodo(todo : Todo):void {
     //Ajouter les donnée à la fin
     // this.todos.push(todo);
      //ajouter l'objet au début
      this.todos.unshift(todo);
      this.emitTodos();
      this.saveTodoInServer();
    }

    //----------------------------------------------------
    //----Modules Http ------------------------------------
    //-----------------------------------------------------

    saveTodoInServer() : void {
      this.httpClient.put("https://mad-todo-list-default-rtdb.europe-west1.firebasedatabase.app/todos.json", this.todos)
      .subscribe(
        () => {
          console.log("données enregistrer dans le could !");
        },
        (error) => {
          console.log("error cloud !");

        }
      );
    }


    getTodoFromServer() : void {

      this.httpClient.get<Todo[]>("https://mad-todo-list-default-rtdb.europe-west1.firebasedatabase.app/todos.json")
      .subscribe(
        (todoRecup : Todo[]) => {
          this.todos = todoRecup ;
          this.emitTodos();
        },
        (error) => {
          console.log(" erreur de récupération des données from server :"+error);

        },
        () => {
          console.log("Récupération de données terminé from server !");
        }

      )


    }
}
