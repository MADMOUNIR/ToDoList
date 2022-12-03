import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address.models';
import { User } from 'src/app/models/user.models';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userForm : FormGroup;
  constructor(private formBuilder : FormBuilder , private userService : UsersService  , private router : Router) { }

  ngOnInit(): void {
    this.initUserForm();
  }

  initUserForm(){

    this.userForm = this.formBuilder.group({
      firstName : this.formBuilder.control("" , [Validators.required , Validators.minLength(4)]),
      lastName : this.formBuilder.control("" , [Validators.required , Validators.minLength(4)]),
      email : this.formBuilder.control("", [Validators.required ,Validators.email ,  Validators.minLength(4)]),
      description : this.formBuilder.control("" ),
      dateBirth : this.formBuilder.control("" ),
      address : this.formBuilder.group({
        street : this.formBuilder.control("" , Validators.required),
        state : this.formBuilder.control("" , Validators.required),
        zip : this.formBuilder.control("" , Validators.required),
        city : this.formBuilder.control("", Validators.required),
      }),
      aliases : this.formBuilder.array([]),
    });

  }

  addAliases(): void {
    this.getAliases().push(this.formBuilder.control("", Validators.required));

  }

  getAliases() : FormArray {
    return this.userForm.get("aliases") as FormArray ;

  }

  onSubmit(): void {
    const dataUser = this.userForm.value;
    const address =  new Address (dataUser.street , dataUser.city , dataUser.state ,dataUser.zip) ;
    const alias = dataUser.aliases ? dataUser.aliases : []
    const user = new User(dataUser.firstName , dataUser.lastName , dataUser.email , address ,   dataUser.description , dataUser.dateBirth ,alias);

    this.userService.addUser(user);
    this.router.navigate(["users"]);

    console.log(this.userForm.value);

  }

}
