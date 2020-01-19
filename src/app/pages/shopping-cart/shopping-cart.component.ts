import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, AfterViewInit {

  boxX = 0;
  boxY = 0;
  boxWidth = 0;
  initialBoxY = 0;

  positionY = 0;
  lastScrollY = 0;

  @ViewChild('checkoutContainer', {static: false})
  checkoutContainer: ElementRef;


  @ViewChild('sideBox', {static: false})
  sideBox: ElementRef;

  constructor(public cartService: ShoppingCartService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    console.log(window.scrollY, this.sideBox.nativeElement.offsetTop);
    this.initialBoxY = this.sideBox.nativeElement.offsetTop - 55;
  }

  isAdded = false;

  @HostListener('window:scroll', [])
  onAppScroll() {
    const offsetY = window.scrollY - this.lastScrollY;

    // console.log('setting boxX');
    // this.boxX = 300;

    // console.log(this.checkoutContainer.nativeElement.getBoundingClientRect());

    this.positionY = Math.min(0, Math.max(this.positionY - offsetY, -64));

    if (window.scrollY >= this.initialBoxY + this.positionY + 64 && !this.isAdded) {
      // this.checkoutContainer.nativeElement.classList.add('checkout-container-fixed');
      this.boxX = this.sideBox.nativeElement.offsetLeft;
      this.boxWidth = this.checkoutContainer.nativeElement.getBoundingClientRect().width;
      this.isAdded = true;
    }

    if (this.isAdded) {
      this.boxY = 74 - 20 + this.positionY + 64;
    }


    if (window.scrollY < this.initialBoxY + this.positionY - 64 && this.isAdded) {
      this.isAdded = false;
      // this.checkoutContainer.nativeElement.classList.remove('checkout-container-fixed');
    }
    // this.positionY = Math.min(0, Math.max(this.positionY - offsetY, -64));
    this.lastScrollY = window.scrollY;
  }
}
