import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'string'
})
export class StringPipe implements PipeTransform {
    transform(value: string, operation?: 'lowercase' | 'uppercase'): string {
        if (operation === 'lowercase') {
            return value.toLowerCase();
        } else if (operation === 'uppercase') {
            return value.toUpperCase();
        }
        return value;
    }
}
