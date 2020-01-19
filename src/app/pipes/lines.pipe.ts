import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lines'
})
export class LinesPipe implements PipeTransform {

  transform(value: string): string[] {
    return value.split('\n');
  }

}
