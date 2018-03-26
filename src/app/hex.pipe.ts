import { PipeTransform, Pipe } from "@angular/core";

@Pipe({name: 'hex'})
export class HexPipe implements PipeTransform {
  transform(value: string): string {
    let i: number;

    for (i = 0; i < value.length; i++) {
      if (value.charAt(i) !== '0') break;
    }

    if (i === value.length) return '0x0';

    return '0x' + value.substring(i);
  }
}
