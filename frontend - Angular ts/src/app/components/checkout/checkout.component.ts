import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FailurePurchaseDialogComponent } from '../failure-purchase-dialog/failure-purchase-dialog.component';
import { SuccessfulPurchaseDialogComponent } from '../successful-purchase-dialog/successful-purchase-dialog.component';

import { CartsService } from './../../services/carts.service';
import { UsersService } from 'src/app/services/users.service';
import { OrdersService } from 'src/app/services/orders.service';

import { OrderDetails } from 'src/app/models/OrderDetails';

import ErrorHandlerUiUtils from 'src/app/utils/ErrorHandlerUIUtils';
import FormValidatorsUtils from 'src/app/utils/FormValidatorsUtils';
import CartUtils from 'src/app/utils/CartUtils';
import { City } from 'src/app/models/City';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  constructor(public router: Router,
    public snackBar: MatSnackBar,
    public _location: Location,
    public datepipe: DatePipe,
    public dialog: MatDialog,
    private ordersService: OrdersService,
    public usersService: UsersService,
    private cartsService: CartsService) { }

  public orderDetails: OrderDetails;
  public busyDeliveryDates: Date[];
  public selectedDate: any;
  //I save it as a local var because I init the users' status on purchase, and then it's gone too on UI
  public creditCardNumber: number;

  public checkoutFormGroup: FormGroup;
  public cityFormControl: FormControl;
  public streetFormControl: FormControl;
  public shippingDateFormControl: FormControl;
  public creditCardFormControl: FormControl;

  public isDisableAddressFields: boolean;

  public isShowNoteToUser: boolean = false;
  public noteToUser: string = "";

  ngOnInit(): void {
    this.orderDetails = new OrderDetails();

    this.busyDeliveryDates = [];

    this.isDisableAddressFields = false;

    // this.usersService.setUsersDefaultCity();

    //coveres page refresh
    if (this.usersService.cities[0] == undefined) {
      this.usersService.getAllCities();
    }

    this.getBusyDeliveryDates();

    this.cityFormControl = new FormControl(this.orderDetails.deliveryCityId, [Validators.required]);
    this.streetFormControl = new FormControl(localStorage.getItem('street'), [Validators.required, Validators.minLength(2), Validators.maxLength(40), Validators.pattern(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/)]);
    this.shippingDateFormControl = new FormControl(localStorage.getItem(''), [Validators.required]);
    this.creditCardFormControl = new FormControl(localStorage.getItem(''), [Validators.required, Validators.pattern("[0-9\s]{8,16}")]);

    this.checkoutFormGroup = new FormGroup({
      city: this.cityFormControl,
      street: this.streetFormControl,
      shippingDate: this.shippingDateFormControl,
      creditCard: this.creditCardFormControl,
    })
  }

  onCheckboxChecked(): void {
    this.isDisableAddressFields = !this.isDisableAddressFields;

    if (this.isDisableAddressFields) {
      this.orderDetails.deliveryCityId = localStorage.getItem('cityID');
      this.orderDetails.deliveryStreet = localStorage.getItem('street');
      this.checkoutFormGroup.controls['street'].disable();
    } else {
      this.orderDetails.deliveryCityId = "";
      this.orderDetails.deliveryStreet = "";
      this.checkoutFormGroup.controls['street'].enable();
    }
  }

  onBackToShopClicked(): void {
    //show cart button
    this.usersService.setCurrentPathName.next('store');

    this._location.back();
  }

  getBusyDeliveryDates(): void {
    let observable = this.ordersService.getBusyDeliveryDates();

    observable.subscribe(serverSuccessfulResponse => {
      this.busyDeliveryDates = serverSuccessfulResponse;
    }, serverErrorResponse => {
      ErrorHandlerUiUtils.handleErrorsOnUi(this.router, serverErrorResponse, this);
    })
  }

  //this func is activated when clicking the datepicker. I disable saturdays, past dates and busy dates
  busyDatesFilter = (date: Date | null): boolean => {
    const time = (date || new Date()).getTime();
    const day = (date || new Date()).getDay();

    for (let busyDate of this.busyDeliveryDates) {
      busyDate = new Date(busyDate);
    }

    return !this.busyDeliveryDates.find(x => new Date(x).getTime() == time) && day !== 6 && time > new Date().getTime();
  }

  onDeliveryDateSelected(event) {
    this.orderDetails.deliveryDate = event;
  }

  onPlaceOrderClicked(): void {
    this.orderDetails.creditCardDigits = this.creditCardNumber;

    if (!FormValidatorsUtils.isCheckoutFormFieldsValid(this)) {
      return;
    }

    //suitability for mysql needed value.
    this.orderDetails.orderDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.orderDetails.deliveryDate = this.datepipe.transform(this.orderDetails.deliveryDate, 'yyyy-MM-dd');

    //send to the DB only last 4 digits of the credit card
    let srtingCreditCard = this.creditCardNumber.toString();
    srtingCreditCard = srtingCreditCard.slice(srtingCreditCard.length - 4);
    this.orderDetails.creditCardDigits = +srtingCreditCard;

    let observable = this.ordersService.placeOrder(this.orderDetails);

    observable.subscribe(() => {
      //open dialog
      const dialogRef = this.dialog.open(SuccessfulPurchaseDialogComponent,
        { data: this.cartsService.cartItems });

      dialogRef.afterClosed().subscribe(() => {
        CartUtils.initUserPurchaseDetails(this.ordersService, this.cartsService);
      });

    }, serverErrorResponse => {
      //I didn't used the snackbar because projects' demand is to show an appropriate message on failure
      const dialogRef = this.dialog.open(FailurePurchaseDialogComponent,
        {
          data: {
            errorMessage: serverErrorResponse.error.error
          }
        });

      dialogRef.afterClosed().subscribe(() => { });
    })
  }
}
