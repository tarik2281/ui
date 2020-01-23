import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { LoginDialogComponent } from 'src/app/components/login-dialog/login-dialog.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/model/user';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

const SCROLL_OFFSET = 384;

const APP_LOGO_HEIGHT = 192;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
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

  @ViewChild('toolbarDom', { static: false }) toolbarDom: ElementRef<HTMLElement>;

  constructor(private authenticationService: AuthenticationService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              public cartService: ShoppingCartService) {
  }

  ngOnInit() {
    this.authenticationService.user.subscribe(user => {
      console.log('setting user', user);
      this.user = user;
    });

    this.authenticationService.me();
  }

  scrollToContent(element: HTMLDivElement) {
    console.log('scroll called', element);
    window.scrollTo({behavior: 'smooth', top: 458});
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
    const offsetY = window.scrollY - this.lastScrollY;

    this.positionY = Math.max(-window.scrollY, -SCROLL_OFFSET);

    if (this.positionY <= -SCROLL_OFFSET && !this.isAdded) {
      this.isAdded = true;
      // this.toolbarDom.nativeElement.classList.add('mat-elevation-z4');
    }

    if (this.positionY > -SCROLL_OFFSET && this.isAdded) {
      this.isAdded = false;
      // this.toolbarDom.nativeElement.classList.remove('mat-elevation-z4');
    }

    // this.logoHeight = lerp(128, 64, -this.positionY / SCROLL_OFFSET)
    this.logoY = this.positionY + (SCROLL_OFFSET - APP_LOGO_HEIGHT);
    // this.logoX = lerp(100, 10, -this.positionY / SCROLL_OFFSET);
    // this.fancyTextAlpha = lerp(0.87, 0.0, -this.positionY / SCROLL_OFFSET);

    // this.positionY = Math.min(0, Math.max(this.positionY - offsetY, -128));
    this.lastScrollY = window.scrollY;
  }

  toggleVisibility() {
    this.badgeVisible = !this.badgeVisible;
  }
}

function lerp(start, end, amt) {
  return (1-amt)*start+amt*end;
}
