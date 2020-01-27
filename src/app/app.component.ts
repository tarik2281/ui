import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSidenav, MatSnackBar } from '@angular/material';
import { LoginDialogComponent } from 'src/app/components/login-dialog/login-dialog.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/model/user';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { animate, AnimationEvent, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    // trigger('stickyLogo', [
    //   transition(':enter', [
    //     style({ opacity: 1, height: '192px', top: '-192px', left: '100px' }),
    //     animate('.25s ease', style({ opacity: 1, height: '64px', top: 0, left: '16px' }))
    //   ]),
    //   transition(':leave', [
    //     style({ opacity: 1, height: '64px', top: 0, left: '16px' }),
    //     animate('.25s ease', style({ opacity: 1, height: '192px', top: '-192px', left: '100px' }))
    //   ])
    // ])
    trigger('stickyLogo', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-64px)' }),
        animate('.25s ease', style({opacity: 1, transform: 'none' }))
      ]),

      transition(':leave', [
        style({ opacity: 1, transform: 'none' }),
        animate('.25s ease', style({opacity: 0, transform: 'translateY(-64px)' }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit, AfterViewInit {

  isSmall$ = this.breakpointObserver.observe('(max-width: 860px)')
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  title = 'ui';

  user: User;

  isAdded = false;

  logoVisible = true;

  @ViewChild('toolbarDom', { read: ElementRef, static: false }) toolbarDom: ElementRef<HTMLElement>;
  @ViewChild('content', { static: false }) contentDiv: ElementRef<HTMLDivElement>;
  @ViewChild('mainContainer', { static: false }) mainContainer: ElementRef<HTMLDivElement>;
  @ViewChild('stickySentinel', { static: false }) stickySentinel: ElementRef<HTMLDivElement>;

  @ViewChild('drawer', {read: MatSidenav, static:false}) sidenav: MatSidenav;

  constructor(private authenticationService: AuthenticationService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              public cartService: ShoppingCartService,
              private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {
    this.authenticationService.user.subscribe(user => {
      console.log('setting user', user);
      this.user = user;
    });

    this.authenticationService.me();
  }

  openDrawer() {
    if (this.sidenav) {
      this.sidenav.open();
    }
  }

  ngAfterViewInit(): void {

    const obs = new IntersectionObserver((entries, observer) => {
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
  }

  firstActivation = true;

  onAnimationDone(event: AnimationEvent) {
    if (event.toState === 'void') {
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
      this.contentDiv.nativeElement.scrollIntoView({behavior:'smooth', block:'start', inline:'nearest'})
      // window.scrollTo({ behavior: 'smooth', top: 384 });
    } else {
      // this.contentDiv.nativeElement.scrollIntoView({ behavior})
      this.contentDiv.nativeElement.scrollIntoView({behavior:'auto', block:'start', inline:'nearest'})

      // window.scrollTo({ behavior: 'auto', top: 384 });
    }
console.log(this.sidenav);

    if (this.sidenav) {
      this.sidenav.close()
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
}

function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}
