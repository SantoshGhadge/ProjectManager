import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../Task.modal';
import {ProjectmanagerService} from '../services/projectmanager.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  @Input() taskList :Array<Task>;
  constructor(private projectMangService : ProjectmanagerService,private route : Router) {
   }
  
  ngOnInit() {
    this.projectMangService.getAllTaskList().subscribe(data => {  
      this.taskList = data;  
    });
  }

  getTaskList(){
    this.taskList = [];
    this.projectMangService.getAllTaskList().subscribe(data => {  
      this.taskList = data;  
    });
  }

  endTask(task : Task) : void{
      this.projectMangService.endTask(task).subscribe( data => {alert("Task ended successfully.")});    
      this.route.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.route.navigate(["viewTask"])); 
  }

  editTask(task : Task){
    this.route.navigate(['updateTask/'+JSON.stringify(task)]);
  }


}
