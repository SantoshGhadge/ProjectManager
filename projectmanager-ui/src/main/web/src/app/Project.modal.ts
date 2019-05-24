
export class Project{
    projectId : number;
    project : string;
    startDate : Date;
    endDate : Date;
    priority : number;
    managerId : number;
    status : string;
    noOfTasks : number;
    
    public Project(){

    }
    constructor(projectId : number,
        project : string,
        startDate : Date,
        endDate : Date,
        priority : number,
        managerId : number,
        status : string,
        noOfTasks : number
     ){
        this.projectId = projectId;
        this.project = project;
        this.startDate = startDate;
        this.endDate = endDate;
        this.priority = priority;
        this.managerId = managerId;
        this.status = status;
        this.noOfTasks = noOfTasks;
    }
}