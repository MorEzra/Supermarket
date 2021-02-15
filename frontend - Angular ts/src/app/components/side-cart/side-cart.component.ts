import { UsersService } from 'src/app/services/users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CartItem } from 'src/app/models/CartItem';

import { CartsService } from '../../services/carts.service';

import ErrorHandlerUiUtils from 'src/app/utils/ErrorHandlerUIUtils';

@Component({
  selector: 'app-side-cart',
  templateUrl: './side-cart.component.html',
  styleUrls: ['./side-cart.component.css']
})
export class SideCartComponent implements OnInit {
  constructor(private router: Router,
    public snackBar: MatSnackBar,
    public cartsService: CartsService,
    public usersService: UsersService) { }

  public cartItems: CartItem[];

  ngOnInit(): void {
    this.cartItems = this.cartsService.cartItems;

    //subscription for service values > handles live changes' renders too.
    this.cartsService.setActiveCartItems.subscribe((value: CartItem[]) => {
      this.cartItems = value;
    });
  }

  onPurchaseClicked(): void {
    //hide cart button
    this.usersService.setCurrentPathName.next('checkout');
    //close the drawer
    this.usersService.toggle();
    this.router.navigate(['/client/checkout']);
  }

  onDeleteCartItemClicked(item): void {
    let observable = this.cartsService.deleteCartItem(item.cartItemID);

    observable.subscribe(() => {
      this.cartsService.removeCartItem.next(item);
    }, serverErrorResponse => {
      ErrorHandlerUiUtils.handleErrorsOnUi(this.router, serverErrorResponse, this);
    })
  }

  onEmptyCartClicked(): void {
    let observable = this.cartsService.emptyCart();

    observable.subscribe(() => {
      this.cartsService.setActiveCartItems.next([]);
    }, serverErrorResponse => {
      ErrorHandlerUiUtils.handleErrorsOnUi(this.router, serverErrorResponse, this);
    })
  }
}
