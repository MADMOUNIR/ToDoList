import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ToDoComponent } from './todo/todo.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContactComponent } from './contact/contact.component';
import { AddTodoComponent } from './todo/add-todo/add-todo.component';
import { SingleTodoComponent } from './single-todo/single-todo.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './users/add-user/add-user.component';

 const ROUTES : Routes = [
  {path:'home' , component : HomeComponent},
  {path:'todos' , component : ToDoComponent},
  {path:'not-found' , component : NotFoundComponent},
  {path:'contact' , component : ContactComponent},
  {path:'add-todo' , component : AddTodoComponent},
  {path:'single-todo/:id' , component : SingleTodoComponent},
  {path:'users' , component : UsersComponent},
  {path:'add-user' , component : AddUserComponent},
  {path:'' , component : HomeComponent},
  {path:'**' ,pathMatch : 'full' , redirectTo : 'not-found'},

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule ,
    RouterModule.forRoot(ROUTES),
  ],
  exports : [RouterModule]
})
export class AppRoutingModule { }
