import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { animate, AnimationBuilder, AnimationMetadata, AnimationPlayer, keyframes, style } from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';

const slideAnimation = animate('{{duration}} {{delay}} ease', keyframes([
  style({ opacity: 0, transform: 'translate({{x}}px, {{y}}px)' }),
  style({ opacity: 1, transform: 'none' })
]));

const growAnimation = animate('{{duration}} {{delay}} ease', keyframes([
  style({ opacity: 0, transform: 'scale(0.8)' }),
  style({ opacity: 1, transform: 'none' })
]));

const shrinkAnimation = animate('{{duration}} {{delay}} ease', keyframes([
  style({ opacity: 0, transform: 'scale(1.2)' }),
  style({ opacity: 1, transform: 'none' })
]));

const fadeAnimation = animate('{{duration}} {{delay}} ease', keyframes([
  style({ opacity: 0 }),
  style({ opacity: 1 })
]));

const expandAnimation = [
  style({ height: 0 }),
  animate('{{duration}} {{delay}} ease')
];

export type ScrollInAnimation = 'slideLeft' | 'slideRight' | 'slideTop' | 'slideBottom' | 'grow' | 'shrink' | 'fade' | 'expand';

interface AnimationParams {
  x?: number;
  y?: number;
  delay: string;
  duration?: string;
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

  @Input()
  animationDelay = '0.1s';

  @Input()
  animationDuration: string | undefined;

  constructor(private animationBuilder: AnimationBuilder,
              private element: ElementRef<HTMLElement>,
              private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {

    this.element.nativeElement.style.opacity = '0';

    this.observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {

        let src = this.breakpointObserver.isMatched('(min-width: 1000px)') ? this.appScrollIn : this.singleColumnAnimation;
        if (!src) {
          src = this.appScrollIn;
        }

        let animation: AnimationMetadata | AnimationMetadata[];
        const params: AnimationParams = {
          delay: this.animationDelay
        };

        switch (src) {
          case 'slideLeft':
            params.x = -50;
            params.y = 0;
            params.duration = '1s';
            animation = slideAnimation;
            break;
          case 'slideRight':
            params.x = 50;
            params.y = 0;
            params.duration = '1s';
            animation = slideAnimation;
            break;
          case 'slideTop':
            params.x = 0;
            params.y = -50;
            params.duration = '1s';
            animation = slideAnimation;
            break;
          case 'slideBottom':
            params.x = 0;
            params.y = 50;
            params.duration = '1s';
            animation = slideAnimation;
            break;
          case 'grow':
            params.duration = '0.5s';
            animation = growAnimation;
            break;
          case 'shrink':
            params.duration = '0.5s';
            animation = shrinkAnimation;
            break;
          case 'fade':
            params.duration = '1s';
            animation = fadeAnimation;
            break;
          case 'expand':
            params.duration = '1s';
            animation = expandAnimation;
            break;
        }

        if (this.animationDuration) {
          params.duration = this.animationDuration;
        }

        const factory = this.animationBuilder.build(animation);

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
        if (src === 'expand') {
          this.element.nativeElement.style.opacity = '1';
        }
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
