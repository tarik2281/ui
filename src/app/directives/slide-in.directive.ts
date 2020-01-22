import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

const SCROLL_TOLERANCE = 100;

@Directive({
  selector: '[appSlideIn]'
})
export class SlideInDirective implements OnInit, AfterViewInit {

  isActive = false;

  @Input()
  appSlideIn: 'left' | 'right' = 'left';

  constructor(private element: ElementRef<HTMLElement>) {
    // console.log('init', window.innerHeight, this.element.nativeElement.getBoundingClientRect().top);
  }

  ngOnInit(): void {
    switch (this.appSlideIn) {
      case 'left':
        this.element.nativeElement.classList.add('slide-in-left');
        break;
      case 'right':
        this.element.nativeElement.classList.add('slide-in-right');
        break;
    }
  }

  ngAfterViewInit(): void {
    // console.log('init', window.innerHeight, this.element.nativeElement.getBoundingClientRect().top);
    this.dispatch();
  }

  dispatch() {
    if (!this.isActive) {
      const windowBottom = window.innerHeight;
      const elementTop = this.element.nativeElement.getBoundingClientRect().top;

      if (elementTop < windowBottom - SCROLL_TOLERANCE) {
        this.isActive = true;

        switch (this.appSlideIn) {
          case 'left':
            this.element.nativeElement.classList.add('slide-in-left-active');
            break;
          case 'right':
            this.element.nativeElement.classList.add('slide-in-right-active');
            break;
        }
      }
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: Event) {
    this.dispatch();
    // console.log('scroll', window.innerHeight, this.element.nativeElement.getBoundingClientRect().top);
  }
}
