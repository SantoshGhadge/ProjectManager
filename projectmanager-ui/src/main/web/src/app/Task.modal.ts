import { ParentTask } from "./ParentTask.modal";

export class Task{
    taskId : number;
    task : string;
    priority : number;
    parentTask : ParentTask;
    startDate : Date;
    endDate : Date;
    projectId : number;
    userId : number;
    public Task(){

    }
    constructor(taskId : number,
        task : string,
        priority : number,
        parentTask : ParentTask,
        startDate : Date,
        endDate : Date,
        projectId : number,
        userId : number
    ){
        this.taskId = taskId;
        this.task = task;
        this.priority = priority;
        this.parentTask = parentTask;
        this.startDate = startDate;
        this.endDate = endDate;
        this.projectId = projectId;
        this.userId = userId;
    }
}