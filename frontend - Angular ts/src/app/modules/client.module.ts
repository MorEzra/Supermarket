import { SharedModule } from './shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

import { ClientComponent } from './../components/client/client.component';
import { SideCartComponent } from '../components/side-cart/side-cart.component';
import { CheckoutComponent } from './../components/checkout/checkout.component';
import { CheckoutCartItemsComponent } from '../components/checkout-cart-items/checkout-cart-items.component';
import { StoreComponent } from '../components/store/store.component';
import { SuccessfulPurchaseDialogComponent } from '../components/successful-purchase-dialog/successful-purchase-dialog.component';
import { FailurePurchaseDialogComponent } from '../components/failure-purchase-dialog/failure-purchase-dialog.component';

import { HighlightSearchTextPipe } from './../pipes/HighlightSearchTextPipe';
import { MaterialModule } from './material.module';
import { AddToCartDialogComponent } from '../components/add-to-cart-dialog/add-to-cart-dialog.component';

const routes: Routes = [
  {
    path: "", component: ClientComponent, children: [
      { path: "", redirectTo: "store", pathMatch: "full" },
      { path: "checkout", component: CheckoutComponent },
      { path: "store", component: StoreComponent },
    ]
  }
];

@NgModule({
  declarations: [
    ClientComponent,
    SideCartComponent,
    CheckoutComponent,
    CheckoutCartItemsComponent,
    SuccessfulPurchaseDialogComponent,
    FailurePurchaseDialogComponent,
    AddToCartDialogComponent,
    
    //pipes
    HighlightSearchTextPipe,
  ],
  imports: [
    SharedModule,MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [DatePipe],
})
export class ClientModule { }
