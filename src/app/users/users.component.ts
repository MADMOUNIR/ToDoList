import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user.models';
import { Address } from '../models/address.models';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit , OnDestroy {

 users : User[] ;
 usersSubscription : Subscription ;

  constructor(private userService : UsersService ) { }

  ngOnInit(): void {
   this.usersSubscription = this.userService.userSub.subscribe(
     (usersRecup : User[]) => {
       this.users = usersRecup;
     }
   );
   this.userService.emitUser();
  }

  ngOnDestroy():void {
    this.usersSubscription.unsubscribe();
  }

  getKeys(obj){
    return Object.keys(obj)
  }

}
