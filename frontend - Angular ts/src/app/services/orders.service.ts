import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { OrderDetails } from '../models/OrderDetails';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private URL: string = "http://localhost:3001/orders/";

  public lastOrderDetails: OrderDetails = {};

  constructor(private http: HttpClient) { }

  getOrdersQty(): Observable<any> {
    return this.http.get(this.URL + 'qty');
  }

  getLastOrder(): Observable<OrderDetails> {
    return this.http.get<any>(this.URL)
  }

  getBusyDeliveryDates(): Observable<any> {
    return this.http.get<any>(this.URL + 'busy-dates')
  }

  placeOrder(orderDetails): Observable<any> {
    return this.http.post(this.URL, orderDetails);
  }
}
