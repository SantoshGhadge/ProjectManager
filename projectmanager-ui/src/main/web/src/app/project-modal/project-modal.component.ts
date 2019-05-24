import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Project } from '../Project.modal';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.css']
})
export class ProjectModalComponent {

  closeResult: string;
 projectList : Project[];
 theCheckbox = false;
 marked = false;


 @Output() projectEvent = new EventEmitter<Project>();
  constructor(private modalService: NgbModal,private projectService : ProjectService) {
    this.getProjectList();
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  getProjectList(){
    this.projectService.getProjectList().subscribe(data => {  
      this.projectList = data;  
    });
  }

  addProject(user : any) : void{
    this.projectEvent.emit(user);
    this.modalService.dismissAll();
  }
}
