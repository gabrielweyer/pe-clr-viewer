import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'byte' })
export class BytePipe implements PipeTransform {
  transform(value: number | string): string {
    if (typeof value === 'number') {
      return value.toString(16).toUpperCase();
    }
    return value.toUpperCase();
  }
}
