import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category, Product } from '../../models/store/products/product';
import { PRODUCT_BY_ID_URL, PRODUCT_URL, PRODUCT_CATEGORIES_URL, PRODUCT_DELETE_CATEGORY_URL } from '../../endpoints/endpoints';


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

  // Traer los productos por ID
  getProductById(id:string): Observable<Product>{
    return this.http.get<Product>(`${PRODUCT_BY_ID_URL}/${id}`).pipe(catchError(this.handlerUserError));
  }

  // Traer los productos por Categoria
  getProductByCategory(id:string): Observable<Product[]>{
    return this.http.get<Product[]>(`${PRODUCT_BY_ID_URL}/${id}`).pipe(catchError(this.handlerUserError));
  }

  newCategory(category:string): Observable<Category>{
    return this.http.post<Category>(PRODUCT_CATEGORIES_URL, category).pipe(catchError(this.handlerUserError));
  }

  getAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(PRODUCT_CATEGORIES_URL).pipe(catchError(this.handlerUserError));
  }

  deleteCategory(id:string): Observable<{}>{
    return this.http.delete<Category[]>(`${PRODUCT_DELETE_CATEGORY_URL}/${id}`).pipe(catchError(this.handlerUserError));
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
