import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserLoginDetails } from 'src/app/models/UserLoginDetails';

import { UsersService } from '../../services/users.service';

import ErrorHandlerUiUtils from 'src/app/utils/ErrorHandlerUIUtils';
import LoginUtils from '../../utils/LoginUtils';
import FormValidatorsUtils from 'src/app/utils/FormValidatorsUtils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public router: Router,
    public snackBar: MatSnackBar,
    public usersService: UsersService) { }

  public userLoginDetails: UserLoginDetails;

  public loginFormGroup: FormGroup;
  public usernameFormControl: FormControl;
  public passwordFormControl: FormControl;

  public isShowNoteToUser: boolean = false;
  public noteToUser: string = "";

  ngOnInit(): void {
    this.userLoginDetails = new UserLoginDetails();

    this.usernameFormControl = new FormControl("", [Validators.required, Validators.pattern(/\S+@\S+\.\S+/), Validators.minLength(6), Validators.maxLength(40)]);
    this.passwordFormControl = new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/)]);

    this.loginFormGroup = new FormGroup({
      username: this.usernameFormControl,
      password: this.passwordFormControl
    })
  }

  login(): void {
    //in case of users' DOM intervention
    if (!FormValidatorsUtils.isLoginFormFieldsValid(this)) {
      return;
    }

    const observable = this.usersService.login(this.userLoginDetails);

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