import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name : 'arrayFilterProject'
})

export class ProjectFilterPipe implements PipeTransform{
    transform(items: Array<any>, projectSearch: string) {
        if(items && items.length){
            return items.filter( it => {
                if(projectSearch && (it.project.toLowerCase().indexOf(projectSearch.toLowerCase())) === -1){
                    return false;
                }
                return true;
                })
               } else{
                return items;
            }
        }
        
}