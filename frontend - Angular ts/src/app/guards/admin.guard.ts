import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import SnackbarUtils from '../utils/SnackbarUtils';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  public constructor(private router: Router, public snackBar: MatSnackBar) { }

  public canActivate(): any {
    const userType = localStorage.getItem('userType');

    if (userType == "Admin") {
      let message = "Welcome! have a nice day";
      SnackbarUtils.openSnackBar(message, "", this);
      return true;
    }
    this.router.navigate(["/home"]);
    let message = "Access denied";
    SnackbarUtils.openSnackBar(message, "", this);
    return false;
  }
}