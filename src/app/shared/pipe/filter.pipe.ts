import { Pipe, PipeTransform } from '@angular/core';
import { IProducts } from '../interfaces/products';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products: IProducts[], searchValue: string): IProducts[] {
    return products.filter((product) => {
      return product.title.toUpperCase().includes(searchValue.toUpperCase());
    });
  }

}
