import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { saveAs } from 'file-saver';

import { UsersService } from 'src/app/services/users.service';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-successful-purchase-dialog',
  templateUrl: './successful-purchase-dialog.component.html',
  styleUrls: ['./successful-purchase-dialog.component.css']
})
export class SuccessfulPurchaseDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
  private usersService: UsersService,
    private cartsService: CartsService) { }

  ngOnInit(): void {
  }

  onDownloadReceiptClicked(): void {
    let total = this.gatherReceiptDetails();
    this.exportTxtFile(total);
  }

  gatherReceiptDetails(): string {
    let total = "";

    for (let item of this.data) {
      total = total + `${item.quantity} x ${item.productName} - ${item.price}$ per unit\n`;
    }

    total = total + `\nTOTAL RECEIPT PRICE: ` + this.cartsService.totalCartPrice + `$\n\n***THANK YOU FOR YOUR PURCHASE***`;

    return total;
  }

  exportTxtFile(total): void {
    let blob = new Blob([total],
      { type: "text/plain;charset=utf-8" });

    saveAs(blob, new Date() + "-receipt.txt");
  }

  onBackToShopClicked(): void {
    //show cart button
    this.usersService.setCurrentPathName.next('store');

    this.router.navigate(['/client/store']);
  }
}
