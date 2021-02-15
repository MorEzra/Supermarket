import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';

import { ProductsService } from './../../services/products.service';

import ErrorHandlerUiUtils from 'src/app/utils/ErrorHandlerUIUtils';
import FormValidatorsUtils from 'src/app/utils/FormValidatorsUtils';

@Component({
  selector: 'app-update-product-dialog',
  templateUrl: './update-product-dialog.component.html',
  styleUrls: ['./update-product-dialog.component.css']
})
export class UpdateProductDialogComponent implements OnInit {
  constructor(private router: Router,
    public snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<UpdateProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productsService: ProductsService) { }

  public product: Product;
  public updatedProduct: Product;
  public categories: Category[];
  private fileToDelete: string;
  private newImage: string;
  private newCategoryID: number;

  ngOnInit(): void {
    this.product = this.data;
    this.updatedProduct = { ...this.product };

    this.fileToDelete = this.product.image;
    this.newImage = this.product.image;

    //I handle this var for UI issues
    this.newCategoryID = { ...this.product }.categoryID;
    this.categories = this.productsService.categories;
  }

  onCategoryUpdate(categoryID): void {
    this.newCategoryID = categoryID;

    //set category name because it goes to waste when user choose another id (value takes over)
    let selectedCategory = this.categories.filter(category => category.categoryID == categoryID);
    this.updatedProduct.categoryName = selectedCategory[0].categoryName;
  }

  onUpdateProductClicked(): void {
    if (!FormValidatorsUtils.isUpdateProductFieldsValid(this)) {
      return;
    }

    const data = new FormData();
    data.append('fileToDelete', this.fileToDelete);
    data.append('file', this.newImage);

    this.updatedProduct.categoryID = this.newCategoryID;

    if (this.newImage != this.fileToDelete) {
      let observable = this.productsService.uploadImage(data);

      observable.subscribe(serverSuccessfulResponse => {
        this.updatedProduct.image = serverSuccessfulResponse.filename;
        this.updateProduct();
      }, serverErrorResponse => {
        ErrorHandlerUiUtils.handleErrorsOnUi(this.router, serverErrorResponse, this);
      })
      //if the image didn't change
    } else {
      this.updatedProduct.image = this.product.image;
      this.updateProduct();
    }
  }

  updateProduct(): void {
    let observable = this.productsService.updateProduct(this.updatedProduct);

    observable.subscribe(() => {
      this.productsService.setUpdatedProduct.next(this.updatedProduct);
      
      this.dialogRef.close();
    }, serverErrorResponse => {
      ErrorHandlerUiUtils.handleErrorsOnUi(this.router, serverErrorResponse, this);
    })
  }

  onUpdatePictureClicked(event): void {
    const image = event.target.files[0];

    let reader = new FileReader();
    reader.onload = (e) => {
      this.updatedProduct.image = e.target.result;
    }
    reader.readAsDataURL(image);
    this.newImage = image;
  }
}