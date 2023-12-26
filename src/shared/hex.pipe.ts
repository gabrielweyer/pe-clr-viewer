import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'hex',
  standalone: true
})
export class HexPipe implements PipeTransform {
  transform(value: string): string {
    let offsetOfFirstNonZeroCharacter = 0;

    while (offsetOfFirstNonZeroCharacter < value.length) {
      if (value.charAt(offsetOfFirstNonZeroCharacter) !== '0') {
        break;
      }
      offsetOfFirstNonZeroCharacter++;
    }

    if (offsetOfFirstNonZeroCharacter === value.length) {
      return '0x0';
    }

    return '0x' + value.substring(offsetOfFirstNonZeroCharacter);
  }
}
