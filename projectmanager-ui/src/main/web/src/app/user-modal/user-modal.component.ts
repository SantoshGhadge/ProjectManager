import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user.service';
import { User } from '../User.modal';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent{
 closeResult: string;
 userList : User[];
 theCheckbox = false;
 marked = false;
 user : User;

 @Output() userEvent = new EventEmitter<User>();
  constructor(private modalService: NgbModal,private userService : UserService) {
    this.getUserList();
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

  getUserList(){
    this.userService.getUserList().subscribe(data => {  
      this.userList = data;  
    });
  }

  addUser(user : any) : void{
    this.userEvent.emit(user);
    this.modalService.dismissAll();
  }
}
