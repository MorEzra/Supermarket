import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDrawer } from '@angular/material/sidenav';

import { CartsService } from 'src/app/services/carts.service';
import { ProductsService } from './../../services/products.service';
import { UsersService } from 'src/app/services/users.service';

import ErrorHandlerUiUtils from 'src/app/utils/ErrorHandlerUIUtils';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  constructor(private router: Router,
    public snackBar: MatSnackBar,
    public usersService: UsersService,
    public cartsService: CartsService,
    private productsService: ProductsService) { }

  public currentPathName: string;

  // ** mat-drawer-starts ** //
  //this block handles MAT-DRAWER close/open - depends if user is on store or checkout page
  @ViewChild('drawer') public drawer: MatDrawer;

  ngAfterViewInit(): void {
    this.usersService.setDrawer(this.drawer);
  }

  toggleDrawer(): void {
    this.usersService.toggle();
  }
  // ** mat-drawer-ends ** //

  ngOnInit(): void {
    //for init users location in case of page refresh - in order to know if cart icon should be displayed or not
    this.usersService.setCurrentPathName.next(window.location.pathname.split('/client/').pop());

    this.currentPathName = this.usersService.currentPathName;

    this.usersService.setCurrentPathName.subscribe((value: string) => {
      this.currentPathName = value;
    })

    //the next functions will happen ONLY in case of page refresh
    if (this.cartsService.cartID === undefined) {
      this.setCartItemsByCartStatus();
    }

    if (this.productsService.products[0] == undefined) {
      this.productsService.getAllProductsFromServer();
    }

    if (this.productsService.categories[0] == undefined) {
      this.productsService.getAllCategoriesFromServer();
    }
  }

  setCartItemsByCartStatus(): void {
    let observable = this.usersService.getUserDetails();

    observable.subscribe(serverSuccessfulResponse => {
      this.cartsService.cartID = serverSuccessfulResponse.cartID;
      if (this.cartsService.cartID != null) {
        this.getActiveCartItems();
      }
    }, serverErrorResponse => {
      ErrorHandlerUiUtils.handleErrorsOnUi(this.router, serverErrorResponse, this);
    })
  }

  getActiveCartItems(): void {
    let observable = this.cartsService.getActiveCartItems();

    observable.subscribe(serverSuccessfulResponse => {
      this.cartsService.setActiveCartItems.next(serverSuccessfulResponse);
    }, serverErrorResponse => {
      ErrorHandlerUiUtils.handleErrorsOnUi(this.router, serverErrorResponse, this);
    })
  }
}