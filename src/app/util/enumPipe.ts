import { Pipe, PipeTransform } from "@angular/core";
import { CategoryType } from "../Enum/CategoryType";

@Pipe({
    name: 'categoryName',
})
export class categoryName implements PipeTransform {
    transform(value: string, categoryList) {
        categoryList.forEach(element => {
            if (element.id == value) {
                value = element.name;
            }
        });
        return value;
    }
}