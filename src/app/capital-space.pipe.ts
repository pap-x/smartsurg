import {Pipe, PipeTransform} from '@angular/core';
@Pipe ({
   name : 'addspaces'
})
export class AddSpaces implements PipeTransform {
    transform(name : string) : string {
        if (name) {  
        return name.replace(/([A-Z])/g, ' $1').trim();
        }
    }
}