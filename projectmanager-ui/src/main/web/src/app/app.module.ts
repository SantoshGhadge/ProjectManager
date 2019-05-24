import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { UserComponent } from './user/user.component';
import { ProjectComponent } from './project/project.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { UserFiterPipe } from './userfilter.pipe';
import { UserModalComponent } from './user-modal/user-modal.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ProjectModalComponent } from './project-modal/project-modal.component';
import { ParentModalComponent } from './parent-modal/parent-modal.component';
import { ProjectFilterPipe } from './projectfilter.pipe';

const routes : Routes=[
  {path :"addTask", component: AddTaskComponent},
  { path :"viewTask", component : ViewTaskComponent},
  { path :"updateTask/:task", component : AddTaskComponent},
  { path :"project" , component : ProjectComponent},
  { path : "user", component : UserComponent},
  { path :"updateUser/:user", component : UserComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    ViewTaskComponent,
    UserComponent,
    ProjectComponent,
    FilterPipe,
    UserFiterPipe,
    UserModalComponent,
    ProjectModalComponent,
    ParentModalComponent,
    ProjectFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
