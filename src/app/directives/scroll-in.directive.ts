import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { animate, AnimationBuilder, AnimationMetadata, AnimationPlayer, keyframes, style } from '@angular/animations';

const slideAnimation = animate('1s ease', keyframes([
  style({ opacity: 0, transform: 'translate({{x}}px, {{y}}px)' }),
  style({ opacity: 1, transform: 'none' })
]));

const growAnimation = animate('.3s ease', keyframes([
  style({ opacity: 0, transform: 'scale(0.8)' }),
  style({ opacity: 1, transform: 'none' })
]));

export type ScrollInAnimation = 'slideLeft' | 'slideRight' | 'slideTop' | 'slideBottom' | 'grow' | 'fade';

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

  constructor(private animationBuilder: AnimationBuilder,
              private element: ElementRef<HTMLElement>) {
  }

  ngOnInit(): void {


    let animation: AnimationMetadata;
    const params: AnimationParams = {};

    switch (this.appScrollIn) {
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
