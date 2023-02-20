import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nonNullable',
})
export class NonNullablePipe<T> implements PipeTransform {
  transform(value: T[] | null): T[] {
    return Array.isArray(value) ? value : [];
  }
}
