import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserRegisterDetails } from 'src/app/models/UserRegisterDetails';

import { UsersService } from '../../services/users.service';

import ErrorHandlerUiUtils from 'src/app/utils/ErrorHandlerUIUtils';
import FormValidatorsUtils from 'src/app/utils/FormValidatorsUtils';
import LoginUtils from '../../utils/LoginUtils'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(public router: Router,
    public snackBar: MatSnackBar,
    public usersService: UsersService) { }

  public userRegisterDetails: UserRegisterDetails;

  public registerFormGroup: FormGroup;
  public userIdFormControl: FormControl;
  public firstNameFormControl: FormControl;
  public surnameFormControl: FormControl;
  public usernameFormControl: FormControl;
  public passwordFormControl: FormControl;
  public repeatPasswordFormControl: FormControl;
  public cityFormControl: FormControl;
  public streetFormControl: FormControl;

  public isShowNoteToUser: boolean = false;
  public noteToUser: string = "";

  ngOnInit(): void {
    this.userRegisterDetails = new UserRegisterDetails();

    //coveres page refresh
    if (this.usersService.cities[0] == undefined) {
      this.usersService.getAllCities();
    }

    this.userIdFormControl = new FormControl("", [Validators.required, Validators.pattern("[0-9\s]{8,9}")]);
    this.firstNameFormControl = new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(40), Validators.pattern(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/)]);
    this.surnameFormControl = new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(40), Validators.pattern(/^[A-Za-z _]*[A-Za-z][A-Za-z _]*$/)]);
    this.usernameFormControl = new FormControl("", [Validators.required, Validators.pattern(/\S+@\S+\.\S+/), Validators.minLength(6), Validators.maxLength(40)]);
    this.passwordFormControl = new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/)]);
    this.repeatPasswordFormControl = new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/)]);
    this.cityFormControl = new FormControl("", [Validators.required]);
    this.streetFormControl = new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(40), Validators.pattern(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/)]);

    this.registerFormGroup = new FormGroup({
      userID: this.userIdFormControl,
      firstName: this.firstNameFormControl,
      surname: this.surnameFormControl,
      username: this.usernameFormControl,
      password: this.passwordFormControl,
      repeatPassword: this.repeatPasswordFormControl,
      cityID: this.cityFormControl,
      street: this.streetFormControl
    })
  }

  register(): void {
    //coveres users' DOM intervention
    if (!FormValidatorsUtils.isRegisterFormFieldsValid(this)) {
      return;
    }

    const observable = this.usersService.register(this.userRegisterDetails);

    observable.subscribe(serverSuccessfulResponse => {
      LoginUtils.setUsersCache(serverSuccessfulResponse.token,
        serverSuccessfulResponse.username,
        serverSuccessfulResponse.userType,
        serverSuccessfulResponse.street,
        serverSuccessfulResponse.cityID);

      LoginUtils.routeUserByUserType(serverSuccessfulResponse.userType, this);

    }, serverErrorResponse => {
      ErrorHandlerUiUtils.handleErrorsOnUi(this.router, serverErrorResponse, this);
    })
  }
}