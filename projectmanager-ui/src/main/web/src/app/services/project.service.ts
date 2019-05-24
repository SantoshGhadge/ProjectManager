import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
export class ProjectService {
  private apiUrl ='/api/project';

  constructor(private http : HttpClient) {   }

  private extractData(res : Response){
    let content = res;
    return content || [{}];
  }

   createProject(project) : Observable<any>{
      return this.http.post(this.apiUrl,JSON.stringify(project),httpOptions).pipe(map(this.extractData));
   }
   
   getProjectList() :Observable<any>{
    return this.http.get(this.apiUrl+'/getProjectList').pipe(map(this.extractData));
   }
  
   updateProject(project) : Observable<any>{
    return this.http.put(this.apiUrl+'/updateProject/'+project.projectId,JSON.stringify(project),httpOptions).pipe(map(this.extractData));
  }

  suspendProject(project) : Observable<any>{
    return this.http.delete(this.apiUrl+'/'+project.projectId).pipe(map(this.extractData));
  } 
}
