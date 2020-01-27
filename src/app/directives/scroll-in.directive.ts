import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { animate, AnimationBuilder, AnimationMetadata, AnimationPlayer, keyframes, style } from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';

const slideAnimation = animate('1s ease', keyframes([
  style({ opacity: 0, transform: 'translate({{x}}px, {{y}}px)' }),
  style({ opacity: 1, transform: 'none' })
]));

const growAnimation = animate('.3s ease', keyframes([
  style({ opacity: 0, transform: 'scale(0.8)' }),
  style({ opacity: 1, transform: 'none' })
]));

const shrinkAnimation = animate('1s ease', keyframes([
  style({ opacity: 0, transform: 'scale(1.2)' }),
  style({ opacity: 1, transform: 'none' })
]));

const fadeAnimation = animate('1s ease', keyframes([
  style({ opacity: 0 }),
  style({ opacity: 1 })
]));

export type ScrollInAnimation = 'slideLeft' | 'slideRight' | 'slideTop' | 'slideBottom' | 'grow' | 'shrink' | 'fade';

interface AnimationParams {
  x?: number;
  y?: number;
}

@Directive({
  selector: '[appScrollIn]'
})
export class ScrollInDirective implements OnInit, OnDestroy {

  private observer: IntersectionObserver;

  player: AnimationPlayer;

  @Input()
  appScrollIn: ScrollInAnimation = 'grow';

  @Input()
  singleColumnAnimation: ScrollInAnimation | undefined;

  constructor(private animationBuilder: AnimationBuilder,
              private element: ElementRef<HTMLElement>,
              private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {

    let src = this.breakpointObserver.isMatched('(min-width: 1000px)') ? this.appScrollIn : this.singleColumnAnimation;
    if (!src) {
      src = this.appScrollIn;
    }

    let animation: AnimationMetadata;
    const params: AnimationParams = {};

    switch (src) {
      case 'slideLeft':
        params.x = -200;
        params.y = 0;
        animation = slideAnimation;
        break;
      case 'slideRight':
        params.x = 200;
        params.y = 0;
        animation = slideAnimation;
        break;
      case 'slideTop':
        params.x = 0;
        params.y = -200;
        animation = slideAnimation;
        break;
      case 'slideBottom':
        params.x = 0;
        params.y = 200;
        animation = slideAnimation;
        break;
      case 'grow':
        animation = growAnimation;
        break;
      case 'shrink':
        animation = shrinkAnimation;
        break;
      case 'fade':
        animation = fadeAnimation;
        break;
    }

    const factory = this.animationBuilder.build(animation);

    this.element.nativeElement.style.opacity = '0';

    this.observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {

        this.observer.disconnect();
        this.observer = undefined;

        if (this.element.nativeElement instanceof HTMLImageElement) {
          const image = this.element.nativeElement as HTMLImageElement;
          if (!image.complete) {
            image.onload = () => {
              this.player = factory.create(this.element.nativeElement, { params });
              this.player.play();
            };
            return;
          }
        }

        this.player = factory.create(this.element.nativeElement, { params });
        this.player.play();
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
