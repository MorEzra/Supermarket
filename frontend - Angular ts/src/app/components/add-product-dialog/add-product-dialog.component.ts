import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

import { Product } from 'src/app/models/Product';
import { Category } from 'src/app/models/Category';

import { ProductsService } from './../../services/products.service';

import ErrorHandlerUiUtils from 'src/app/utils/ErrorHandlerUIUtils';
import FormValidatorsUtils from 'src/app/utils/FormValidatorsUtils';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent implements OnInit {
  constructor(private router: Router,
    public snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddProductDialogComponent>,
    private productsService: ProductsService) { }

  public newImage: any;
  public newProduct: Product;
  public categories: Category[];

  ngOnInit(): void {
    this.newProduct = new Product();

    this.categories = this.productsService.categories;

    this.newProduct.image = "http://localhost:3001/no-image.jpg";
  }

  onCategoryChoose(categoryID): void {
    this.newProduct.categoryID = categoryID;

    //to set category name. because it goes to waste when user choose another category id (value takes over).
    let selectedCategory = this.categories.filter(category => category.categoryID == categoryID);
    this.newProduct.categoryName = selectedCategory[0].categoryName;
  }

  onAddImageClicked(event): void {
    const image = event.target.files[0];

    let reader = new FileReader();
    reader.onload = (e) => {
      this.newProduct.image = e.target.result;
    }

    reader.readAsDataURL(image);
    this.newImage = image;
  }

  onCreateProductClicked(): void {
    if (!FormValidatorsUtils.isAddProductFieldsValid(this)) {
      return;
    }

    const data = new FormData();
    data.append('file', this.newImage);

    try {
      let observable = this.productsService.uploadImage(data);

      observable.subscribe(serverSuccessfulResponse => {
        this.newProduct.image = serverSuccessfulResponse.filename;
        this.createProduct();
      }, serverErrorResponse => {
        ErrorHandlerUiUtils.handleErrorsOnUi(this.router, serverErrorResponse, this);
      })
    }
    catch (error) {
      ErrorHandlerUiUtils.handleErrorsOnUi(this.router, error, this);
    }
  }

  createProduct(): void {
    let observable = this.productsService.createProduct(this.newProduct);

    observable.subscribe(() => {
      this.productsService.setNewProduct.next(this.newProduct);

      this.dialogRef.close();
    }, serverErrorResponse => {
      ErrorHandlerUiUtils.handleErrorsOnUi(this.router, serverErrorResponse, this);
    })
  }
}
