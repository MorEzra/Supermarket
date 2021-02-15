import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import SnackbarUtils from '../utils/SnackbarUtils';

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {
  public constructor(private router: Router, public snackBar: MatSnackBar) { }

  public canActivate(): any {
    const userType = localStorage.getItem('userType');

    if (userType == "Client") {
      let message = "Welcome! have a nice purchase";
      SnackbarUtils.openSnackBar(message, "", this);
      return true;
    }
    this.router.navigate(["/home"]);
    let message = "Access denied";
    SnackbarUtils.openSnackBar(message, "", this);
    return false;
  }
}