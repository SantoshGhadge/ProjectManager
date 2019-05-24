import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name : 'arrayFilterUser'
})

export class UserFiterPipe implements PipeTransform{
    transform(items: Array<any>, userSearch: string) {
        if(items && items.length){
            return items.filter( it => {
                if(userSearch && (it.firstName.toLowerCase().indexOf(userSearch.toLowerCase())) === -1){
                    return false;
                }
                return true;
                })
               } else{
                return items;
            }
        }
        
}