import ErrorHandlerUiUtils from 'src/app/utils/ErrorHandlerUIUtils';
import { Category } from './../models/Category';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private URL: string = "http://localhost:3001/products/";

  public products: Product[] = [];

  public categories: Category[] = [];

  public setAllProducts: Subject<Product[]> = new Subject<Product[]>();
  public setUpdatedProduct: Subject<Product> = new Subject<Product>();
  public setNewProduct: Subject<Product> = new Subject<Product>();
  public setAllCategories: Subject<Category[]> = new Subject<Category[]>();

  constructor(private router: Router, private http: HttpClient) {
    this.setAllProducts.subscribe((value: Product[]) => {
      this.products = value;
    })

    this.setUpdatedProduct.subscribe((value: Product) => {
      let index = this.products.map(function (productToFind: Product) {
        return productToFind.productID;
      }).indexOf(value.productID);

      this.products[index] = value;
    })

    this.setNewProduct.subscribe((value: Product) => {
      this.products.push(value);
    })

    this.setAllCategories.subscribe((value: Category[]) => {
      this.categories = value;
    })
  }

  getProductsQty(): Observable<any> {
    return this.http.get<any>(this.URL + "qty");
  }

  getAllCategories(): Observable<Product[]> {
    return this.http.get<Category[]>(this.URL + "categories");
  }

  getAllCategoriesFromServer(): void {
    let observable = this.getAllCategories();

    observable.subscribe(serverSuccessfulResponse => {
      this.setAllCategories.next(serverSuccessfulResponse);
    }, serverErrorResponse => {
      ErrorHandlerUiUtils.handleErrorsOnUi(this.router, serverErrorResponse, this);
    })
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.URL);
  }

  getAllProductsFromServer(): void {
    let observable = this.getAllProducts();

    observable.subscribe(serverSuccessfulResponse => {
      this.setAllProducts.next(serverSuccessfulResponse);
    }, serverErrorResponse => {
      ErrorHandlerUiUtils.handleErrorsOnUi(this.router, serverErrorResponse, this);
    })
  }

  getProductsByCategoryID(categoryID): Observable<Product[]> {
    return this.http.get<Product[]>(this.URL + `byCategory?category=${categoryID}`);
  }

  getProductsBySearchValue(productName): Observable<Product[]> {
    return this.http.get<Product[]>(this.URL + `byProductName?productName=${productName}`);
  }

  uploadImage(data): Observable<any> {
    return this.http.post(this.URL + 'uploadImage', data)
  }

  updateProduct(updatedProduct): Observable<any> {
    return this.http.put(this.URL, updatedProduct);
  }

  createProduct(newProduct): Observable<Product> {
    return this.http.post(this.URL, newProduct);
  }
}