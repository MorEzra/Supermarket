import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';

import ErrorHandlerUiUtils from 'src/app/utils/ErrorHandlerUIUtils';

@Component({
  selector: 'app-purchase-status',
  templateUrl: './purchase-status.component.html',
  styleUrls: ['./purchase-status.component.css']
})
export class PurchaseStatusComponent implements OnInit {
  constructor(public router: Router,
    public snackBar: MatSnackBar,
    public usersService: UsersService,
    public ordersService: OrdersService,
    public cartsService: CartsService) { }

  public noteToUser: string;
  public buttonText: string;

  ngOnInit(): void {
    this.buttonText = "";
    this.noteToUser = "";

    if (localStorage.getItem('token')) {
      this.setPageByUserPurchaseStatus();
    }
  }

  setPageByUserPurchaseStatus(): void {
    let observable = this.cartsService.isFirstPurchase();

    observable.subscribe(serverSuccessfulResponse => {
      if (serverSuccessfulResponse) {
        this.noteToUser = 'Welcome to your first purchase!';
        this.buttonText = "Start shopping";
      } else {
        this.setPageByUserCartStatus();
      }
    }, serverErrorResponse => {
      ErrorHandlerUiUtils.handleErrorsOnUi(this.router, serverErrorResponse, this);
    })
  }

  setPageByUserCartStatus(): void {
    let observable = this.usersService.getUserDetails();

    observable.subscribe(serverSuccessfulResponse => {
      this.cartsService.cartID = serverSuccessfulResponse.cartID;

      if (this.cartsService.cartID != null) {
        this.getActiveCartItems();
      } else {
        this.getLastOrder();
      }
    }, serverErrorResponse => {
      ErrorHandlerUiUtils.handleErrorsOnUi(this.router, serverErrorResponse, this);
    })
  }

  getActiveCartItems(): void {
    let observable = this.cartsService.getActiveCartItems();

    observable.subscribe(serverSuccessfulResponse => {
      this.cartsService.cartItems = serverSuccessfulResponse;

      //this case happens when the user emptied the cart and logged out.
      if (!this.cartsService.cartItems[0]) {
        this.cartsService.totalCartPrice = 0;
        this.noteToUser = `You have an active cart, but it's empty...`
      } else {
        //for UI display only, it's fine by me to calc the total price on client side.
        //no harm is possible because final price is calculated on server side
        this.calcTotalCartPrice();
        this.noteToUser = `You have an active cart from ${this.cartsService.cartItems[0].creationDate}, with a total value of ${this.cartsService.totalCartPrice}$`;
      }
      this.buttonText = "Continue shopping";
    }, serverErrorResponse => {
      ErrorHandlerUiUtils.handleErrorsOnUi(this.router, serverErrorResponse, this);
    })
  }

  calcTotalCartPrice(): void {
    let totalCartPrice = 0;

    for (let item of this.cartsService.cartItems) {
      totalCartPrice = totalCartPrice + +item.totalPrice;
    }

    this.cartsService.totalCartPrice = totalCartPrice;
  }

  getLastOrder(): void {
    let observable = this.ordersService.getLastOrder();

    observable.subscribe(serverSuccessfulResponse => {
      this.ordersService.lastOrderDetails = serverSuccessfulResponse;

      this.noteToUser = `Your last order was on ${serverSuccessfulResponse.orderDate}`;
      this.buttonText = "Start shopping";
    }, serverErrorResponse => {
      ErrorHandlerUiUtils.handleErrorsOnUi(this.router, serverErrorResponse, this);
    })
  }
}
