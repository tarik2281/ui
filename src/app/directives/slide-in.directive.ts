import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { animate, AnimationBuilder, AnimationPlayer, keyframes, style } from '@angular/animations';

const slideAnimation = animate('1s ease', keyframes([
  style({ opacity: 0, transform: 'translate({{x}}px, {{y}}px)' }),
  style({ opacity: 1, transform: 'none' })
]));

@Directive({
  selector: '[appSlideIn]'
})
export class SlideInDirective implements OnInit, OnDestroy {

  private observer: IntersectionObserver;

  player: AnimationPlayer;

  @Input()
  appSlideIn: 'left' | 'right' | 'top' | 'bottom' = 'left';

  constructor(private animationBuilder: AnimationBuilder,
              private element: ElementRef<HTMLElement>) {
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

    this.element.nativeElement.style.opacity = '0';

    this.observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        this.player = factory.create(this.element.nativeElement, { params: { x, y } });
        this.player.play();
        this.observer.disconnect();
        this.observer = undefined;
      }
    }, { threshold: [0.2] });

    this.observer.observe(this.element.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }

    if (this.player) {
      this.player.destroy();
    }
  }
}
