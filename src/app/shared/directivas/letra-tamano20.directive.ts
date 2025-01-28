import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appLetraTamano20]',
  standalone: false
})
export class LetraTamano20Directive {

  constructor(
    private elementRef: ElementRef
  ) {
    this.elementRef.nativeElement.style.fontSize = '20px'
    this.elementRef.nativeElement.style.fontFamily = 'Courier New';
    this.elementRef.nativeElement.style.backgroundColor = 'white';
    this.elementRef.nativeElement.style.textAlign = 'center'
    this.elementRef.nativeElement.style.marginTop = '20px'
  }

}
