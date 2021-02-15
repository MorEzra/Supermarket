import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Product } from './../../models/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(public dialog: MatDialog) { }

  @Input() products: Product[];
  @Input() dialogToShow: any;
  @Input() categoryName: string;

  ngOnInit(): void {
  }

  onProductClicked(product): void {
    //open dialog
    const dialogRef = this.dialog.open(this.dialogToShow,
      { data: product });

    dialogRef.afterClosed().subscribe(() => { });
  }
}
