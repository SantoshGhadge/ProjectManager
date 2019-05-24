
export class User{
    firstName : string;
    lastName : string;
    empId : number;
    userId: number;
   
    public User(){

    }
    constructor(firstName : string,
        lastName : string,
        empId : number,
        userId : number
     ){
        this.firstName = firstName;
        this.lastName = lastName;
        this.empId = empId;
        this.userId = userId;
    }
}