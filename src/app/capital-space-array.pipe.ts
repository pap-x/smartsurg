import {Pipe, PipeTransform} from '@angular/core';
@Pipe ({
   name : 'addspacesarray'
})
export class AddSpacesArray implements PipeTransform {
    transform(input : string[]) : string {
        if (input) {  
            return input.join().replace(/([A-Z])/g, ' $1').trim();
        }
    }
}