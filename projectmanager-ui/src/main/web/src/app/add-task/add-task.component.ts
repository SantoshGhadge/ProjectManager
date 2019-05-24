import { Component, OnInit } from '@angular/core';
import { Task } from '../Task.modal';
import { TaskService } from '../services/task.service';
import { ParentTask } from '../ParentTask.modal';
import { FormGroup, FormBuilder, FormControl, AbstractControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Project } from '../Project.modal';
import { User } from '../User.modal';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {

  model: any = {};
  taskList : Task[];
  routedTask : any;
  pipe = new DatePipe('en-US');
  selectedParentVal : string;
  addTaskFlag : boolean = true;
  updatetaskFlag : boolean = false;
  project : Project;
  user : User;
  marked = false;
  task : Task;
  //modaltype : string;

 constructor(private taskService : TaskService,private userService : UserService, fb : FormBuilder,private route : Router,private routedData : ActivatedRoute){
     this.getAllTaskList();

     this.routedData.params.subscribe((parameters)=> {
       this.routedTask = null;
       this.routedTask = JSON.parse(parameters['task'])}
     );

      let date = new Date();
      this.model.startDate=this.pipe.transform(date, 'yyyy-MM-dd');
      this.model.endDate=this.pipe.transform(date.setDate(date.getDate() + 1), 'yyyy-MM-dd');
     
     if(this.routedTask){
       
       this.updatetaskFlag = true;
       this.addTaskFlag = false;
       this.model.task = this.routedTask.task;
       this.model.priority = this.routedTask.priority;
       this.model.startDate = this.pipe.transform(this.routedTask.startDate, 'yyyy-MM-dd');
       this.model.endDate = this.pipe.transform(this.routedTask.endDate, 'yyyy-MM-dd');
       this.model.parentTask = this.routedTask.parentTask;
       this.model.taskId = this.routedTask.taskId;
       this.model.projectId = this.routedTask.projectId;
       this.selectedParentVal = this.routedTask.parentTask.parentTask;
       this.userService.getUserbyTaskId(this.routedTask.taskId).subscribe(data => {  
        this.model.userId = data.empId;  
      });
     }

 }

 getAllTaskList(){
   this.taskService.getAllTaskList().subscribe(data => {  
     this.taskList = data;  
   });
 }

 addTask(form : any) : void{
   this.model = form;
   var parentTaskObj = null;
   if(this.model){
     if(this.model.parentTask){
       //parentTaskObj = new ParentTask(this.model.parentTask.task_id,this.model.parentTask.task);
       parentTaskObj = this.model.parentTask;
     }else{
       parentTaskObj = new ParentTask(null,null);
     } 
     let taskObj = new Task(null,this.model.task,this.model.priority,parentTaskObj,this.model.startDate,this.model.endDate,this.model.projectId,this.model.userId);
     this.taskService.createTask(taskObj).subscribe( data => {alert("Task created successfully.")});
     this.route.navigateByUrl('/', {skipLocationChange: true}).then(()=>
     this.route.navigate(["addTask"])); 
   }
 }

 updateTask(form : any) : void{
   this.model = form;
   var parentTaskObj = null;
   if(this.model){
     if(this.model.parentTask){
       parentTaskObj = this.model.parentTask;
     }else{
       parentTaskObj = new ParentTask(null,null);
     } 
     let taskObj = new Task(this.model.taskId,this.model.task,this.model.priority,parentTaskObj,this.model.startDate,this.model.endDate,this.model.projectId,this.model.userId);
     this.taskService.updateTask(taskObj).subscribe( data => {alert("Task updated successfully.")});
     this.route.navigateByUrl('/', {skipLocationChange: true}).then(()=>
     this.route.navigate(["viewTask"])); 
   }
 }

 reset(){
   this.model ={};
 }

 cancel(){
   this.route.navigate(['viewTask']);
 }

 receiveProject($event){
  this.project = $event;
  this.model.projectId = this.project.projectId;
  }

  receiveUser($event){
    this.user = $event;
    this.model.userId = this.user.empId;
  }

  receiveTask($event){
    this.task = $event;
    let parentTaskObj = new ParentTask(this.task.taskId,this.task.task);
    this.model.parentTask = parentTaskObj;
  }

  toggleVisibility(e){
    let date = new Date();
    this.marked= e.target.checked;
    this.model.startDate="";
    this.model.endDate="";
  }

}
