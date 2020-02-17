import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatSidenav, MatSnackBar } from '@angular/material';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/model/user';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { animate, style, transition, trigger } from '@angular/animations';
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
        animate('.25s ease', style({ opacity: 1, transform: 'none' }))
      ]),

      transition(':leave', [
        style({ opacity: 1, transform: 'none' }),
        animate('.25s ease', style({ opacity: 0, transform: 'translateY(-64px)' }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit, AfterViewInit, OnChanges {

  isSmall$ = this.breakpointObserver.observe('(max-width: 860px)')
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  title = 'ui';

  user: User;

  isAdded = false;
  firstActivation = true;

  @ViewChild('sidenavContainer', {static: false, read: ElementRef}) sidenavContainer: ElementRef<HTMLElement>;
  @ViewChild('content', { static: false }) contentDiv: ElementRef<HTMLDivElement>;
  @ViewChild('stickySentinel', { static: false }) stickySentinel: ElementRef<HTMLDivElement>;

  @ViewChild('drawer', { read: MatSidenav, static: false }) sidenav: MatSidenav;

  constructor(private authenticationService: AuthenticationService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              public cartService: ShoppingCartService,
              private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {
    this.authenticationService.me().subscribe(user => {
      this.user = user;
    });

    this.intersectionObserver = new IntersectionObserver((entries, observer) => {
      this.isAdded = !entries[0].isIntersecting;
    });
  }

  openDrawer() {
    if (this.sidenav) {
      this.sidenav.open();
    }
  }

  intersectionObserver: IntersectionObserver;

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngAfterViewInit(): void {

    // !!!!!
    // this.sidenavContainer.nativeElement.classList.remove('mat-drawer-container');



    // obs.observe(this.stickySentinel.nativeElement);
  }


  onActivate(event) {
    this.intersectionObserver.disconnect();

    const fancyHeaderElement = document.querySelector('.fancy-header');
    if (fancyHeaderElement) {
      this.intersectionObserver.observe(fancyHeaderElement);
    }
    else {
      this.isAdded = true;
    }

    // this.intersectionObserver.observe(document.querySelector('.fancy-header'));

    // console.log(document.querySelector('.fancy-header'));

    if (this.firstActivation) {
      this.firstActivation = false;
      return;
    }

    console.log(event);
    if (!this.isAdded) {
      this.contentDiv.nativeElement.scrollIntoView({ behavior: 'auto', block: 'start', inline: 'nearest' });
      // window.scrollTo({ behavior: 'smooth', top: 384 });
    } else {
      // this.contentDiv.nativeElement.scrollIntoView({ behavior})
      this.contentDiv.nativeElement.scrollIntoView({ behavior: 'auto', block: 'start', inline: 'nearest' });

      // window.scrollTo({ behavior: 'auto', top: 384 });
    }
    console.log(this.sidenav);

    if (this.sidenav) {
      this.sidenav.close();
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
}

function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}
