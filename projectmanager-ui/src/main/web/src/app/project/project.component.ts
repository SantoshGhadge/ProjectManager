import { Component, OnInit, ChangeDetectorRef,ChangeDetectionStrategy, DoCheck, Input  } from '@angular/core';
import { Project } from '../Project.modal';
import { DatePipe } from '@angular/common';
import { User } from '../User.modal';
import { ProjectService } from '../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProjectComponent implements OnInit {

  marked = false;
  theCheckbox = false;
  model: any ={};
  pipe = new DatePipe('en-US');
  user : User;
  projectList : Project[];
  updateOperation = false;
  //modaltype : string;
  sortedList : Project[];

  constructor(private projectService : ProjectService,private userService : UserService,private route : Router,private routedData : ActivatedRoute,
    private changeDetectorRef : ChangeDetectorRef ) { }

  ngOnInit() {
    this.model = new Project(null,null,null,null,null,null,null,null);
      this.getProjectList();
    }

  toggleVisibility(e){
    let date = new Date();
    this.marked= e.target.checked;
    this.model.startDate=this.pipe.transform(date, 'yyyy-MM-dd');
    this.model.endDate=this.pipe.transform(date.setDate(date.getDate() + 1), 'yyyy-MM-dd');
  }

  receiveUser($event){
    this.user = $event;
    this.model.managerId = this.user.empId;
  }

  addProject(form : any){
    this.model = form;
    if(this.model){
      let projObj = new Project(null,this.model.project,this.model.startDate,this.model.endDate,this.model.priority,this.model.managerId,null,null);
      this.projectService.createProject(projObj).subscribe( data => {alert("Project created successfully.")});
      this.route.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.route.navigate(["project"])); 
    }
  }

  getProjectList() : any{
    this.projectService.getProjectList().subscribe(data => {  
       this.projectList = data;  
    });
  }

  editProject(project : any){
    this.model = project;
    this.model.startDate =  this.pipe.transform(project.startDate, 'yyyy-MM-dd');
    this.model.endDate =  this.pipe.transform(project.endDate, 'yyyy-MM-dd');
    this.marked= true;
    this.updateOperation = true;
    this.userService.getUserByProjectId(this.model.projectId).subscribe(data => {  
      this.model.managerId = data.empId;  
    });
   }

   suspend(project : any){
    this.projectService.suspendProject(project).subscribe( data => {alert("Project suspended successfully.")});    
    this.route.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.route.navigate(["project"])); 
   }

   updateProject(form : any){
    this.model = form;
    if(this.model){
      let projObj = new Project(this.model.projectId,this.model.project,this.model.startDate,this.model.endDate,this.model.priority,this.model.managerId,null,null);
      this.projectService.updateProject(projObj).subscribe( data => {alert("Project updated successfully.")});
      this.route.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.route.navigate(["project"])); 
    }
  }
  
  reset(){
    this.model ={};
  }

  cancel(){
    this.model ={};
  }
  
  sortDataByDate() {
    this.projectList.sort((a, b) => 
    new Date(a.startDate).getDate() - new Date(b.startDate).getDate());
    this.changeDetectorRef.detectChanges();
  }

  sortDataByEndDate() {
    this.projectList.sort((a, b) => 
      new Date(a.endDate).getDate() - new Date(b.endDate).getDate());
      this.changeDetectorRef.detectChanges();
     }

  sortByPriority() {
    this.projectList.sort((a, b) => 
    a.priority - b.priority);
    this.changeDetectorRef.detectChanges();
    }

}
