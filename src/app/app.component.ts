import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { LoginDialogComponent } from 'src/app/components/login-dialog/login-dialog.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/model/user';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { NavigationEnd, Router } from '@angular/router';
import { animate, AnimationEvent, style, transition, trigger } from '@angular/animations';

const SCROLL_OFFSET = 384;

const APP_LOGO_HEIGHT = 192;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('stickyLogo', [
      transition(':enter', [
        style({ opacity: 1, height: '192px', top: '-192px', left: '100px' }),
        animate('.25s ease', style({ opacity: 1, height: '64px', top: 0, left: '16px' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, height: '64px', top: 0, left: '16px' }),
        animate('.25s ease', style({ opacity: 1, height: '192px', top: '-192px', left: '100px' }))
      ])
    ])

  ]
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'ui';

  user: User;
  positionY = 0;
  lastScrollY = 0;

  badgeVisible = false;

  isAdded = false;

  logoX = 100;
  logoY = (SCROLL_OFFSET - APP_LOGO_HEIGHT);
  logoHeight = 128;

  fancyTextAlpha = 0.87;

  logoVisible = true;

  @ViewChild('toolbarDom', { read: ElementRef, static: false }) toolbarDom: ElementRef<HTMLElement>;
  @ViewChild('content', { static: false }) contentDiv: ElementRef<HTMLDivElement>;
  @ViewChild('mainContainer', { static: false }) mainContainer: ElementRef<HTMLDivElement>;
  @ViewChild('stickySentinel', { static: false }) stickySentinel: ElementRef<HTMLDivElement>;

  constructor(private authenticationService: AuthenticationService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              public cartService: ShoppingCartService,
              private router: Router) {
  }

  ngOnInit() {
    this.authenticationService.user.subscribe(user => {
      console.log('setting user', user);
      this.user = user;
    });

    this.authenticationService.me();

  }

  ngAfterViewInit(): void {
    // console.log(this.toolbarDom)

    const obs = new IntersectionObserver((entries, observer) => {
      console.log(entries);

      if (entries[0].isIntersecting) {
        this.isAdded = false;
      } else {
        this.isAdded = true;
        this.logoVisible = false;
      }
      // for (const entry of entries) {
      //
      // }
    });

    obs.observe(this.stickySentinel.nativeElement);
    // obs.observe(this.stickySentinel.nativeElement);
  }

  firstActivation = true;

  onAnimationDone(event: AnimationEvent) {
    console.log(event);

    if (event.toState === 'void') {
      console.log('hidden');
      this.logoVisible = true;
    }
  }

  onActivate(event) {
    if (this.firstActivation) {
      this.firstActivation = false;
      return;
    }

    console.log(event);
    if (!this.isAdded) {
      window.scrollTo({ behavior: 'smooth', top: 458 });
    } else {
      window.scrollTo({ behavior: 'auto', top: 458 });
    }
  }

  scrollToContent(element: HTMLDivElement) {
    // console.log('scroll called', element);
    // window.scrollTo({behavior: 'smooth', top: 458});
    // element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }


  onLogout() {
    this.authenticationService.logout().subscribe(result => {
      this.snackBar.open('Erfolgreich abgemeldet!', null, {
        duration: 2000
      });
      location.reload();
    });
  }

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent, {
      width: '500px'
    });
  }

  @HostListener('window:scroll', [])
  onAppScroll() {
    // const offsetY = window.scrollY - this.lastScrollY;
    //
    // this.positionY = Math.max(-window.scrollY, -SCROLL_OFFSET);
    //
    // if (this.positionY <= -SCROLL_OFFSET && !this.isAdded) {
    //   this.isAdded = true;
    //   // this.toolbarDom.nativeElement.classList.add('mat-elevation-z4');
    // }
    //
    // if (this.positionY > -SCROLL_OFFSET && this.isAdded) {
    //   this.isAdded = false;
    //   // this.toolbarDom.nativeElement.classList.remove('mat-elevation-z4');
    // }
    //
    // // this.logoHeight = lerp(128, 64, -this.positionY / SCROLL_OFFSET)
    // this.logoY = this.positionY + (SCROLL_OFFSET - APP_LOGO_HEIGHT);
    // // this.logoX = lerp(100, 10, -this.positionY / SCROLL_OFFSET);
    // // this.fancyTextAlpha = lerp(0.87, 0.0, -this.positionY / SCROLL_OFFSET);
    //
    // // this.positionY = Math.min(0, Math.max(this.positionY - offsetY, -128));
    // this.lastScrollY = window.scrollY;
  }

  toggleVisibility() {
    this.badgeVisible = !this.badgeVisible;
  }
}

function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}
