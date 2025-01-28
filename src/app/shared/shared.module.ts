import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './pipes/full-name.pipe';
import { LetraTamano20Directive } from './directivas/letra-tamano20.directive';



@NgModule({
  declarations: [
    FullNamePipe,
    LetraTamano20Directive
  ],
  imports: [
    CommonModule
  ],
  exports: [FullNamePipe, LetraTamano20Directive]
})
export class SharedModule { }
