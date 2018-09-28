import {Pipe, PipeTransform} from '@angular/core';
@Pipe ({
   name : 'limitchar'
})
export class LimitChar implements PipeTransform {
    transform(input : string, limit: number) : string {
        if (input.length>limit) {  
            return input.substring(0,limit)+"...";
        }
        else {
            return input;
        }
    }
}