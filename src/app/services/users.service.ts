import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './../models/user.models'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users : User[] = [];
  userSub : Subject<User[]> = new Subject<User[]>();

  constructor() { }

  addUser (user : User) : void{
    this.users.push(user);
    this. emitUser();
  }

  emitUser() : void {
    this.userSub.next(this.users);
  }
}
