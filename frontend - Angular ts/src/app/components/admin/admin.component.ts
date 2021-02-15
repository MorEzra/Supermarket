import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AddProductDialogComponent } from './../add-product-dialog/add-product-dialog.component';
import { UpdateProductDialogComponent } from './../update-product-dialog/update-product-dialog.component';

import { ProductsService } from './../../services/products.service';

import { Product } from 'src/app/models/Product';
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(public productsService: ProductsService,
    public dialog: MatDialog) { }

  public products: Product[];
  public categories: Product[];

  public searchValue: string;
  public selectedCategoryName: string;

  public dialogToShow: any = UpdateProductDialogComponent;

  ngOnInit(): void {
    this.products = this.productsService.products;
    this.categories = this.productsService.categories;

    this.searchValue = "";
    this.selectedCategoryName = "";

    //coveres page refresh
    if (this.productsService.products[0] == undefined) {
      this.productsService.getAllProductsFromServer();
    }

    //coveres page refresh
    if (this.productsService.categories[0] == undefined) {
      this.productsService.getAllCategoriesFromServer();
    }

    //subscription for service values > handles live changes' renders too.
    this.productsService.setAllProducts.subscribe((value: Product[]) => {
      this.products = value;
    });

    this.productsService.setAllCategories.subscribe((value: Category[]) => {
      this.categories = value;
    });
  }

  onCreateProductClicked(): void {
    //open dialog
    const dialogRef = this.dialog.open(AddProductDialogComponent);

    dialogRef.afterClosed().subscribe(() => { });
  }
}
