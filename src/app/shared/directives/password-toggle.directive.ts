import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPasswordToggle]',
  exportAs: 'appPasswordToggle'
})
export class PasswordToggleDirective {

  constructor(private elementRef: ElementRef<HTMLInputElement>) { }

  toggle() {
    if (this.elementRef.nativeElement.type === 'password') {
      this.elementRef.nativeElement.type = 'text';
    } else {
      this.elementRef.nativeElement.type = 'password';
    }
  }

  getIcon() {
    return !this.elementRef || this.elementRef.nativeElement.type === 'password' ? 'visibility' : 'visibility_off';
  }
}
