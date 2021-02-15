import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-failure-purchase-dialog',
  templateUrl: './failure-purchase-dialog.component.html',
  styleUrls: ['./failure-purchase-dialog.component.css']
})
export class FailurePurchaseDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private usersService: UsersService) { }

  ngOnInit(): void {
  }

  onBackToShopClicked(): void {
    //show cart button
    this.usersService.setCurrentPathName.next('store');

    this.router.navigate(['/client/store']);
  }
}
