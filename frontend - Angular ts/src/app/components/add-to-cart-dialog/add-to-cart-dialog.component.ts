import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Product } from '../../models/Product';

import { CartsService } from 'src/app/services/carts.service';

import ErrorHandlerUiUtils from 'src/app/utils/ErrorHandlerUIUtils';
import FormValidatorsUtils from 'src/app/utils/FormValidatorsUtils';

@Component({
  selector: 'app-add-to-cart-dialog',
  templateUrl: './add-to-cart-dialog.component.html',
  styleUrls: ['./add-to-cart-dialog.component.css']
})
export class AddToCartDialogComponent implements OnInit {
  constructor(private router: Router,
    public snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddToCartDialogComponent>,
    private cartsService: CartsService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public product: Product;

  ngOnInit(): void {
    this.product = this.data;
  }

  addProductToCart(product): void {
    if (!FormValidatorsUtils.isQuantityFieldValid(this)) {
      return;
    }

    let observable = this.cartsService.addProductToCart(product);

    observable.subscribe(serverSuccessfulResponse => {
      this.cartsService.addCartItem.next(serverSuccessfulResponse);

      //init quantity input field
      product.quantity = "";

      this.dialogRef.close();
    }, serverErrorResponse => {
      ErrorHandlerUiUtils.handleErrorsOnUi(this.router, serverErrorResponse, this);
    })
  }
}
