import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../Task.modal';
import {TaskService} from '../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../Project.modal';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  @Input() taskList :Array<Task>;
  project : Project;
  constructor(private taskService : TaskService,private route : Router) {
   }
  
  ngOnInit() {
    this.taskService.getAllTaskList().subscribe(data => {  
      this.taskList = data;  
    });
  }

  getTaskList(){
    this.taskList = [];
    this.taskService.getAllTaskList().subscribe(data => {  
      this.taskList = data;  
    });
  }

  endTask(task : Task) : void{
      this.taskService.endTask(task).subscribe( data => {alert("Task ended successfully.")});    
      this.route.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.route.navigate(["viewTask"])); 
  }

  editTask(task : Task){
    this.route.navigate(['updateTask/'+JSON.stringify(task)]);
  }

  receiveProject($event){
    this.project = $event;
    this.taskService.getAllTaskListByProjectId(this.project.projectId).subscribe(data => {  
      this.taskList = data;  
    });
    }

}
