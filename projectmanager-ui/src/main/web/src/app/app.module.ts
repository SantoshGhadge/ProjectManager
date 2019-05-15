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

const routes : Routes=[
  {path :"addTask", component: AddTaskComponent},
  { path :"viewTask", component : ViewTaskComponent},
  { path :"updateTask/:task", component : AddTaskComponent},
  { path :"project" , component : ProjectComponent},
  { path : "user", component : UserComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    ViewTaskComponent,
    UserComponent,
    ProjectComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
