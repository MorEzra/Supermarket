import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { OrdersService } from 'src/app/services/orders.service';
import { CartsService } from './../../services/carts.service';
import { UsersService } from './../../services/users.service';

import ErrorHandlerUiUtils from 'src/app/utils/ErrorHandlerUIUtils';
import CartUtils from 'src/app/utils/CartUtils';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public router: Router,
    public snackBar: MatSnackBar,
    public usersService: UsersService,
    private ordersService: OrdersService,
    private cartsService: CartsService) { }

  public username: string;

  ngOnInit(): void {
  }

  onLogoutClicked(): void {
    let observable = this.usersService.logout();

    observable.subscribe(() => {
      
      localStorage.clear();
      CartUtils.initUserPurchaseDetails(this.ordersService, this.cartsService);
      this.router.navigate(["/home"]);

    }, serverErrorResponse => {
      ErrorHandlerUiUtils.handleErrorsOnUi(this.router, serverErrorResponse, this);
    })
  }
}
