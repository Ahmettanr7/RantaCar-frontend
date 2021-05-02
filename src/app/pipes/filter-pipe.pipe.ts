import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: Car[], filterText: string): Car[] {
    filterText = filterText?filterText.toLocaleLowerCase():""
    return filterText?value.filter((c:Car)=>
    (c.carName.toLocaleLowerCase().indexOf(filterText)&&
    (c.brandName.toLocaleLowerCase().indexOf(filterText)&&
    (c.colorName.toLowerCase().indexOf(filterText))))!==-1):value;
  }

}
