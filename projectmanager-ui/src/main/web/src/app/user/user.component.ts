import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { User } from '../User.modal';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  model: any = {};
  addUserFlag : boolean = true;
  updateUserFlag : boolean = false;
  userList : User[];
  routedTask : any;

  constructor(private userService : UserService,fb : FormBuilder,private route : Router,private routedData : ActivatedRoute) {
      this.getUserList();

      this.routedData.params.subscribe((parameters)=> {
        this.routedTask = null;
        this.routedTask = JSON.parse(parameters['user'])}
      );
      
      if(this.routedTask){
        this.updateUserFlag = true;
        this.addUserFlag = false;
        this.model.firstName = this.routedTask.firstName;
        this.model.lastName = this.routedTask.lastName;
        this.model.empId = this.routedTask.empId;
        this.model.userId = this.routedTask.userId;
        ;
      }
 
   }

  getUserList(){
    this.userService.getUserList().subscribe(data => {  
      this.userList = data;  
    });
  }
  addUser(form : any) : void{
    this.model = form;
    if(this.model){
      let userObj = new User(this.model.firstName,this.model.lastName,this.model.empId,null);
      this.userService.createUser(userObj).subscribe( data => {alert("User created successfully.")});
      this.route.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.route.navigate(["user"])); 
    }
  }

  updateUser(form : any) : void{
    this.model = form;
    if(this.model){
      let userObj = new User(this.model.firstName,this.model.lastName,this.model.empId,this.model.userId);
      this.userService.updateUser(userObj).subscribe( data => {alert("User updated successfully.")});
      this.route.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.route.navigate(["user"])); 
    }
  }

  editUser(user : User){
    this.route.navigate(['updateUser/'+JSON.stringify(user)]);
  }
  
  reset(){
    this.model ={};
  }
 
  cancel(){
    this.route.navigate(['user']);
  }
}
