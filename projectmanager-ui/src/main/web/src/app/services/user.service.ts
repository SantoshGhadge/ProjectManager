import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


const httpOptions ={
  headers :new HttpHeaders({
      'Content-Type' : 'application/json'

  })
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl ='/api/user';

  constructor(private http : HttpClient) {   }

  private extractData(res : Response){
    let content = res;
    return content || [{}];
  }

   createUser(user) : Observable<any>{
      return this.http.post(this.apiUrl,JSON.stringify(user),httpOptions).pipe(map(this.extractData));
   } 

   getUserList() :Observable<any>{
    return this.http.get(this.apiUrl+'/getUserList').pipe(map(this.extractData));
  } 

  updateUser(user) : Observable<any>{
    return this.http.put(this.apiUrl+'/updateUser/'+user.userId,JSON.stringify(user),httpOptions).pipe(map(this.extractData));
    }

    getUserbyTaskId(taskId) :Observable<any>{
      return this.http.get(this.apiUrl+'/'+taskId).pipe(map(this.extractData));
    } 

    getUserByProjectId(projectId) :Observable<any>{
      return this.http.get(this.apiUrl+'/getUserByProjectId/'+projectId).pipe(map(this.extractData));
    } 
}
