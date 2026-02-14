import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis',
  standalone: true,
})
export class EllipsisPipe implements PipeTransform {
  transform(input: string, maxLength: number, appendEllipsis = true): string {
    if (input && input.length > maxLength) {
      const truncatedString = input.substring(0, maxLength);
      return appendEllipsis ? `${truncatedString}...` : truncatedString;
    }
    return input;
  }
}
