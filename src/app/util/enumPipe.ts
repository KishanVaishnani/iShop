import { Pipe, PipeTransform } from "@angular/core";
import { CategoryType } from "../Enum/CategoryType";

@Pipe({
    name: 'categoryName',
  })
  export class categoryName implements PipeTransform {
    transform(value: string) {
    //var name=Object.entries(CategoryType).filter(s=>s.id==value);    
    for (const [propertyKey, propertyValue] of Object.entries(CategoryType)) {
        if(propertyValue==value)
        {
            value=propertyKey;
        }
        // if (!Number.isNaN(Number(propertyKey))) {
        //     continue;
        // }
       //arrayObjects.push({ id: propertyValue, name: propertyKey });
    }
    //   var datePipe = new DatePipe("en-US");
    //   value = datePipe.transform(value, format);
      return value;
    }
  }