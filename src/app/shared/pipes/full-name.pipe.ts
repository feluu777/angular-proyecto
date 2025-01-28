import { Pipe, PipeTransform } from '@angular/core';
import { estudiante } from '../utils/index'
@Pipe({
  name: 'fullName',
  standalone: false
})
export class FullNamePipe implements PipeTransform {

  transform(value: estudiante, ...args: unknown[]): unknown {
    return `${value.apellido.toUpperCase()}, ${value.nombre}`;
  }

}
