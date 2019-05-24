import { Injectable } from '@angular/core';
import { Task } from '../Task.modal';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions ={
  headers :new HttpHeaders({
      'Content-Type' : 'application/json'

  })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl ='/api/tasks';

  constructor(private http : HttpClient) {   }

  private extractData(res : Response){
    let content = res;
    return content || [{}];
  }

   createTask(task) : Observable<any>{
      return this.http.post(this.apiUrl,JSON.stringify(task),httpOptions).pipe(map(this.extractData));
   } 

   updateTask(task) : Observable<any>{
    return this.http.put(this.apiUrl+'/updateTask/'+task.taskId,JSON.stringify(task),httpOptions).pipe(map(this.extractData));
    } 

    getAllTaskList() :Observable<any>{
      return this.http.get(this.apiUrl+'/getAllTaskList').pipe(map(this.extractData));
    } 

    getParentTaskById(taskId) :Observable<any>{
      return this.http.get(this.apiUrl+'/'+taskId).pipe(map(this.extractData));
    } 

    endTask(task) : Observable<any>{
      return this.http.delete(this.apiUrl+'/'+task.taskId).pipe(map(this.extractData));
    } 

    getAllTaskListByProjectId(projectId) :Observable<any>{
      return this.http.get(this.apiUrl+'/getAllTaskListByProjectId/'+projectId).pipe(map(this.extractData));
    } 
    
}
