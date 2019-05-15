import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name : 'arrayFilter'
})

export class FilterPipe implements PipeTransform{
    transform(items: Array<any>, taskSearch: string, parentSearch : string, startDateSearch : string, endDateSearch : string, priorityFromSearch : string, priorityToSearch : string) {
        if(items && items.length){
            return items.filter( it => {
                if(taskSearch && it.task.toLowerCase().indexOf(taskSearch.toLowerCase()) === -1){
                    return false;
                }
                if(parentSearch && it.parentTask.parentTask.toLowerCase().indexOf(parentSearch.toLowerCase()) === -1){
                    return false;
                }
                if(startDateSearch && it.startDate.toLowerCase().indexOf(startDateSearch.toLowerCase()) === -1){
                    return false;
                }
                if(endDateSearch && it.endDate.toLowerCase().indexOf(endDateSearch.toLowerCase()) === -1){
                    return false;
                }
                if(priorityFromSearch  && priorityToSearch){
                    if( it.priority >=parseInt(priorityFromSearch) && it.priority <=parseInt(priorityToSearch) ){
                        return true;
                    }
                    else{
                        return false;
                    }
                }
                return true;
                })
               } else{
                return items;
            }
        }
}