import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { OrdersService } from 'src/app/services/orders.service';
import { CartsService } from './../../services/carts.service';
import { UsersService } from './../../services/users.service';
import { ProductsService } from './../../services/products.service';

import { Category } from './../../models/Category';
import { Product } from './../../models/Product';

import { AddToCartDialogComponent } from '../add-to-cart-dialog/add-to-cart-dialog.component';

import ErrorHandlerUiUtils from 'src/app/utils/ErrorHandlerUIUtils';
import SnackbarUtils from 'src/app/utils/SnackbarUtils';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  constructor(public router: Router,
    public snackBar: MatSnackBar,
    public usersService: UsersService,
    public cartsService: CartsService,
    public ordersService: OrdersService,
    public productsService: ProductsService) { }

  //default init for client component. admin sends its own dialogToShow.
  @Input() dialogToShow: any = AddToCartDialogComponent;

  public cartID: number;
  public totalCartPrice: number;

  public products: Product[];
  public categories: Category[];

  public searchValue: string;
  public selectedCategoryName: string;

  ngOnInit(): void {
    this.products = this.productsService.products;
    this.categories = this.productsService.categories;

    this.searchValue = "";
    this.selectedCategoryName = "";

    this.productsService.getAllCategoriesFromServer();
    this.productsService.getAllProductsFromServer();

    //subscription for service values > handles live changes' renders too.
    this.productsService.setAllProducts.subscribe((value: Product[]) => {
      this.products = value;
    });

    this.productsService.setAllCategories.subscribe((value: Category[]) => {
      this.categories = value;
    });
  }

  onSelectCategoryClicked(categoryID): void {
    //I gave a generic categoryID for "all products", so I'll be able to indicate the choice of showing them.
    if (categoryID == 999) {
      this.selectedCategoryName = "";
      this.productsService.getAllProductsFromServer();
      return;
    }

    let observable = this.productsService.getProductsByCategoryID(categoryID);

    observable.subscribe(serverSuccessfulResponse => {
      //I use the name of the [0] because I don't show categories which are empty on my site,
      //so I will have at least 1 product on the chosen category.
      this.selectedCategoryName = serverSuccessfulResponse[0].categoryName;

      //subscribe for product list updates - also coveres a case when the admin filters by category and then updates or creates a product.
      this.productsService.setAllProducts.next(serverSuccessfulResponse);
    }, serverErrorResponse => {
      ErrorHandlerUiUtils.handleErrorsOnUi(this.router, serverErrorResponse, this);
    })
  }

  onSearchButtonClicked(): void {
    if (!this.searchValue || this.searchValue.trim()) {
      return;
    }

    let observable = this.productsService.getProductsBySearchValue(this.searchValue);

    observable.subscribe(serverSuccessfulResponse => {
      //updates breadcrumbs
      this.selectedCategoryName = `search results for: ${this.searchValue}`;

      //init search input field.
      this.searchValue = "";

      //if the product doesn't exists
      if (serverSuccessfulResponse[0] == undefined) {
        let message = "Sorry, product is out of stock";
        SnackbarUtils.openSnackBar(message, "", this);
        return;
      }

      //I subscribe the new product list as the relevant one to show.
      this.productsService.setAllProducts.next(serverSuccessfulResponse);

    }, serverErrorResponse => {
      ErrorHandlerUiUtils.handleErrorsOnUi(this.router, serverErrorResponse, this);
    })
  }
}
