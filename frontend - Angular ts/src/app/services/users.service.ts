import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDrawer } from '@angular/material/sidenav';

import { UserRegisterDetails } from './../models/UserRegisterDetails';
import { SuccessfulLoginServerResponse } from './../models/SuccessfulLoginServerResponse';
import { UserLoginDetails } from './../models/UserLoginDetails';
import { City } from '../models/City';

import ErrorHandlerUiUtils from '../utils/ErrorHandlerUIUtils';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private URL: string = "http://localhost:3001/users/";

  public username: string = "";

  public cities: City[] = [];

  public currentPathName: string = window.location.pathname.split('/client/').pop();
  public setCurrentPathName: Subject<string> = new Subject<string>();

  // ** mat-drawer-starts ** //
  //this block handles MAT-DRAWER close/open - depends if user is on store or checkout page
  private drawer: MatDrawer;

  setDrawer(drawer: MatDrawer) {
    this.drawer = drawer;
  }

  toggle(): void {
    this.drawer.toggle();
  }
  // ** mat-drawer-ends ** //

  constructor(private http: HttpClient, private router: Router, public snackBar: MatSnackBar) {
    this.setCurrentPathName.subscribe((value: string) => {
      this.currentPathName = value;
    })
  }

  public login(userLoginDetails: UserLoginDetails): Observable<SuccessfulLoginServerResponse> {
    return this.http.post<SuccessfulLoginServerResponse>(this.URL + 'login', userLoginDetails)
  }

  public register(userRegisterDetails: UserRegisterDetails): Observable<SuccessfulLoginServerResponse> {
    return this.http.post<SuccessfulLoginServerResponse>(this.URL, userRegisterDetails)
  }

  public getCitiesList(): Observable<City[]> {
    return this.http.get<City[]>(this.URL + 'cities');
  }

  public getUserDetails(): Observable<any> {
    return this.http.get(this.URL);
  }

  public logout(): Observable<any> {
    return this.http.post(this.URL + "logout", {});
  }

  public isUserLoggedIn(): boolean {
    let token = localStorage.getItem('token');
    if (token) {
      this.username = localStorage.getItem('username');
      return true;
    }
    return false;
  }

  public getAllCities(): void {
    let observable = this.getCitiesList();

    observable.subscribe(serverSuccessfulResponse => {
      this.cities = serverSuccessfulResponse;
    }, serverErrorResponse => {
      ErrorHandlerUiUtils.handleErrorsOnUi(this.router, serverErrorResponse, this);
    })
  }
}
