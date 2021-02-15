import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CartItem } from '../models/CartItem';
import { Product } from '../models/Product';

import CartUtils from '../utils/CartUtils';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  private URL: string = "http://localhost:3001/carts/";

  public cartID: number;
  public cartItems: CartItem[] = [];
  public totalCartPrice: number = 0;

  public setActiveCartItems: Subject<CartItem[]> = new Subject<CartItem[]>();
  public addCartItem: Subject<Product> = new Subject<Product>();
  public removeCartItem: Subject<CartItem> = new Subject<CartItem>();

  constructor(private http: HttpClient) {
    this.setActiveCartItems.subscribe((value: CartItem[]) => {
      this.cartItems = value;
      this.totalCartPrice = CartUtils.calcTotalCartPrice(this.cartItems);
    })

    this.addCartItem.subscribe((value: Product) => {
      this.cartItems.push(value);
      this.totalCartPrice = CartUtils.calcTotalCartPrice(this.cartItems);
    })

    this.removeCartItem.subscribe((value: CartItem) => {
      let index = this.cartItems.indexOf(value);
      this.cartItems.splice(index, 1);
      this.totalCartPrice = CartUtils.calcTotalCartPrice(this.cartItems);
    })
  }

  getActiveCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.URL);
  }

  deleteCartItem(cartItemID): Observable<any> {
    return this.http.delete(this.URL + `byCartItemID?cartItemID=${cartItemID}`);
  }

  emptyCart(): Observable<any> {
    return this.http.delete(this.URL);
  }

  addProductToCart(product): Observable<CartItem> {
    return this.http.post<CartItem>(this.URL, product);
  }

  isFirstPurchase(): Observable<boolean> {
    return this.http.get<boolean>(this.URL + 'status');
  }
}
