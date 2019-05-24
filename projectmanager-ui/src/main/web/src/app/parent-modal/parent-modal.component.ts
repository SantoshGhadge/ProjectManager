import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../Task.modal';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-parent-modal',
  templateUrl: './parent-modal.component.html',
  styleUrls: ['./parent-modal.component.css']
})
export class ParentModalComponent {

  closeResult: string;
 taskList : Task[];
 theCheckbox = false;
 marked = false;


 @Output() taskEvent = new EventEmitter<Task>();
  constructor(private modalService: NgbModal,private taskService : TaskService) {
    this.getAllTaskList();
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

  getAllTaskList(){
    this.taskService.getAllTaskList().subscribe(data => {  
      this.taskList = data;  
    });
  }

  addParentTask(task : any) : void{
    this.taskEvent.emit(task);
    this.modalService.dismissAll();
  }
}
