import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appHoverClass]'
})
export class HoverClassDirective {

  @Input()
  appHoverClass: any;

  constructor(public elementRef: ElementRef) {
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.elementRef.nativeElement.classList.add(this.appHoverClass);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.elementRef.nativeElement.classList.remove(this.appHoverClass);
  }
}
