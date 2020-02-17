import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  animations: [
    trigger('autoExpand', [
      // transition(':enter', [
      //   style({ height: 0 }),
      //   animate('.5s ease')
      // ]),
      transition(':leave', [
        // style({height:'auto'}),
        animate('.5s ease', style({ height: 0 }))
      ])
    ])
  ]
})
export class ShoppingCartComponent implements OnInit {

  constructor(public cartService: ShoppingCartService) {
  }

  ngOnInit() {
  }
}
