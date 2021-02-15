import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { OrdersService } from './../../services/orders.service';
import { ProductsService } from './../../services/products.service';

import ErrorHandlerUiUtils from 'src/app/utils/ErrorHandlerUIUtils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public router: Router,
    public snackBar: MatSnackBar,
    public productsService: ProductsService,
    public ordersService: OrdersService) { }

  public productsQty: number;
  public ordersQty: number;

  ngOnInit(): void {
    //if a logged in user reaches homepage then I route him to the right component.
    this.routeByUserType();

    this.getProductsQty();
    this.getOrdersQty();
  }

  routeByUserType(): void {
    let token = localStorage.getItem('token');
    if (token) {
      let userType = localStorage.getItem('userType');
      if (userType == "Admin") {
        this.router.navigate(["admin"])
      } else if (userType == "Client") {
        this.router.navigate(["client"])
      }
    }
  }

  getProductsQty(): void {
    let observable = this.productsService.getProductsQty();

    observable.subscribe(serverSuccessfulResponse => {
      this.productsQty = serverSuccessfulResponse;
    }, serverErrorResponse => {
      ErrorHandlerUiUtils.handleErrorsOnUi(this.router, serverErrorResponse, this);
    })
  }

  getOrdersQty(): void {
    let observable = this.ordersService.getOrdersQty();
    observable.subscribe(serverSuccessfulResponse => {
      this.ordersQty = serverSuccessfulResponse;
    }, serverErrorResponse => {
      ErrorHandlerUiUtils.handleErrorsOnUi(this.router, serverErrorResponse, this);
    })
  }
}
