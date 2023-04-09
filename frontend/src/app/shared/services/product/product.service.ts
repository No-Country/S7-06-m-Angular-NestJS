import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../../models/store/products/product';
import { PRODUCT_URL } from '../../endpoints/endpoints';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  URL = environment.baseUrl ;

  constructor(private http:HttpClient) { }

  // GET ALL PRODUCTS
  public getAll(): Observable<any> {
    return this.http.get<any>(this.URL + "/products")
  }

  // TRAE TODOS LOS PRODUCTOS
  getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(PRODUCT_URL).pipe(catchError(this.handlerUserError));;
  }

  handlerUserError(error: any): Observable<never> {
    let errorMessage = 'Error';
    if (error) {
      errorMessage = `Error ${error.message}`;
      console.log(errorMessage)
    }
    return throwError(() => (errorMessage));

  }

}
