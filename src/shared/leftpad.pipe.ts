import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'leftpad',
  standalone: true
})
export class LeftPadPipe implements PipeTransform {
  transform(value: string, desiredLength: number): string {
    return value.length >= desiredLength ? value : '0'.repeat(desiredLength - value.length) + value;
  }
}
