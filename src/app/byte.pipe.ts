import { PipeTransform, Pipe } from "@angular/core";

@Pipe({name: 'byte'})
export class BytePipe implements PipeTransform {
  transform(value: number): string {
    return value.toString(16).toUpperCase();
  }
}
