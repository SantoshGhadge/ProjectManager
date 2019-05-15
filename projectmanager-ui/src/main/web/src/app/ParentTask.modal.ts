export class ParentTask{
    parentId : number;
    parentTask : string;
    
    constructor(
        parentId : number,
        parentTask : string
    ){
        this.parentId = parentId;
        this.parentTask = parentTask;
    }
}