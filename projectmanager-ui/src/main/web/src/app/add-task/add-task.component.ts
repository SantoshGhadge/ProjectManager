import { Component, OnInit } from '@angular/core';
import { Task } from '../Task.modal';
import { ProjectmanagerService } from '../services/projectmanager.service';
import { ParentTask } from '../ParentTask.modal';
import { FormGroup, FormBuilder, FormControl, AbstractControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

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

 constructor(private projectMangService : ProjectmanagerService,fb : FormBuilder,private route : Router,private routedData : ActivatedRoute){
     this.getAllTaskList();

     this.routedData.params.subscribe((parameters)=> {
       this.routedTask = null;
       this.routedTask = JSON.parse(parameters['task'])}
     );
     
     if(this.routedTask){
       this.updatetaskFlag = true;
       this.addTaskFlag = false;
       this.model.task = this.routedTask.task;
       this.model.priority = this.routedTask.priority;
       this.model.startDate = this.pipe.transform(this.routedTask.startDate, 'yyyy-MM-dd');
       this.model.endDate = this.pipe.transform(this.routedTask.endDate, 'yyyy-MM-dd');
       this.model.parentTask = this.routedTask.parentTask;
       this.model.task_id = this.routedTask.task_id;
       this.selectedParentVal = this.routedTask.parentTask.parentTask;
     }

 }

 getAllTaskList(){
   this.projectMangService.getAllTaskList().subscribe(data => {  
     this.taskList = data;  
   });
 }

 addTask(form : any) : void{
   this.model = form;
   var parentTaskObj = null;
   if(this.model){
     if(this.model.parentTask){
       parentTaskObj = new ParentTask(this.model.parentTask.task_id,this.model.parentTask.task);
     }else{
       parentTaskObj = new ParentTask(null,null);
     } 
     let taskObj = new Task(null,this.model.task,this.model.priority,parentTaskObj,this.model.startDate,this.model.endDate);
     this.projectMangService.createTask(taskObj).subscribe( data => {alert("Task created successfully.")});
     this.route.navigateByUrl('/', {skipLocationChange: true}).then(()=>
     this.route.navigate(["addTask"])); 
   }
 }

 updateTask(form : any) : void{
   this.model = form;
   var parentTaskObj = null;
   if(this.model){
     if(this.model.parentTask){
       parentTaskObj = new ParentTask(this.model.parentTask.task_id,this.model.parentTask.task);
     }else{
       parentTaskObj = new ParentTask(null,null);
     } 
     let taskObj = new Task(this.model.task_id,this.model.task,this.model.priority,parentTaskObj,this.model.startDate,this.model.endDate);
     this.projectMangService.updateTask(taskObj).subscribe( data => {alert("Task updated successfully.")});
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
}
