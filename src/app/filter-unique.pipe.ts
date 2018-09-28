import {Pipe, PipeTransform} from '@angular/core';

@Pipe ({
   name : 'filterunique',
   pure: false
})

export class FilterUnique implements PipeTransform {
    transform(value: any) : any {
        if (value) {  
        //return Array.from(new Set(value));
            let uniqueArray = value.filter(function (el, index, array) { 
                return array.indexOf (el.type) == index;
            });
        
            return uniqueArray;
        }
    }
}