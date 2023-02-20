import { Pipe, PipeTransform } from '@angular/core';

/* this pipe helps to improve user experience when data is being fetched */
@Pipe({
  name: 'capEmptyData',
})
export class CapEmptyDataPipe implements PipeTransform {
  transform(value: string | number | null | unknown): unknown {
    if (value === '' || Object.is(value, NaN) || value == null) {
      return 'N/A';
    }

    return value;
  }
}
