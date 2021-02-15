import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { CartsService } from 'src/app/services/carts.service';

import { CartItem } from 'src/app/models/CartItem';

@Component({
  selector: 'app-checkout-cart-items',
  templateUrl: './checkout-cart-items.component.html',
  styleUrls: ['./checkout-cart-items.component.css'],
  //in order to make changes in the DOM elements, with the tags returning from the search pipe using a style attr
  encapsulation: ViewEncapsulation.None
})
export class CheckoutCartItemsComponent implements OnInit {
  constructor(public cartsService: CartsService) { }

  public cartItems: CartItem[];
  public searchValue: string;

  ngOnInit(): void {
    this.cartItems = this.cartsService.cartItems;

    //subscription for service values > handles live changes' renders too.
    this.cartsService.setActiveCartItems.subscribe((value: CartItem[]) => {
      this.cartItems = value;
    });
  }
}