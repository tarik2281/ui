import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { animate, AnimationBuilder, AnimationPlayer, keyframes, style } from '@angular/animations';

const SCROLL_TOLERANCE = 100;

const slideAnimation = animate('1s ease', keyframes([
  style({ opacity: 0, transform: 'translate({{x}}px, {{y}}px)' }),
  style({ opacity: 1, transform: 'translate(0, 0)' }),
  // style({ opacity: 0 }),
]));

@Directive({
  selector: '[appSlideIn]'
})
export class SlideInDirective implements OnInit, AfterViewInit {

  player: AnimationPlayer;
  isActive = false;

  @Input()
  appSlideIn: 'left' | 'right' | 'top' | 'bottom' = 'left';

  constructor(private animationBuilder: AnimationBuilder,
              private element: ElementRef<HTMLElement>) {
    // console.log('init', window.innerHeight, this.element.nativeElement.getBoundingClientRect().top);
  }

  ngOnInit(): void {
    const factory = this.animationBuilder.build(slideAnimation);

    let x = 0;
    let y = 0;

    switch (this.appSlideIn) {
      case 'left':
        x = -200;
        break;
      case 'right':
        x = 200;
        break;
      case 'top':
        y = -200;
        break;
      case 'bottom':
        y = 200;
        break;
    }

    this.player = factory.create(this.element.nativeElement, { params: { x, y }});
    this.player.init()

    // switch (this.appSlideIn) {
    //   case 'left':
    //     this.element.nativeElement.classList.add('slide-in-left');
    //     break;
    //   case 'right':
    //     this.element.nativeElement.classList.add('slide-in-right');
    //     break;
    //   case 'top':
    //     this.element.nativeElement.classList.add('slide-in-top');
    //     break;
    //   case 'bottom':
    //     this.element.nativeElement.classList.add('slide-in-bottom');
    //     break;
    // }
  }

  ngAfterViewInit(): void {
    // console.log('init', window.innerHeight, this.element.nativeElement.getBoundingClientRect().top);
    this.dispatch();
  }

  dispatch() {
    if (!this.isActive) {
      const windowBottom = window.innerHeight;
      const elementTop = this.element.nativeElement.getBoundingClientRect().top;

      let bottom = windowBottom;

      switch (this.appSlideIn) {
        case 'top':
          bottom = windowBottom - 200 - SCROLL_TOLERANCE;
          break;
        case 'left':
        case 'right':
          bottom = windowBottom - SCROLL_TOLERANCE;
          break;
        case 'bottom':
          bottom = windowBottom + 200 - SCROLL_TOLERANCE;
          break;
      }

      if (elementTop < bottom) {
        this.isActive = true;
        this.player.play();

        // switch (this.appSlideIn) {
        //   case 'left':
        //     this.element.nativeElement.classList.add('slide-in-left-active');
        //     break;
        //   case 'right':
        //     this.element.nativeElement.classList.add('slide-in-right-active');
        //     break;
        //   case 'top':
        //     this.element.nativeElement.classList.add('slide-in-top-active');
        //     break;
        //   case 'bottom':
        //     this.element.nativeElement.classList.add('slide-in-bottom-active');
        //     break;
        // }
      }
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: Event) {
    this.dispatch();
    // console.log('scroll', window.innerHeight, this.element.nativeElement.getBoundingClientRect().top);
  }
}
