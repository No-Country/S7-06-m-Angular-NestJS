import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductAdmin } from '../models/product-admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  URL = environment.baseUrl + "";

  constructor(private http:HttpClient) { }

  /*---PRODUCTS--------------------------------- */

  // SAVE PRODUCT : Guardar nuevo producto
  public saveProduct(product:FormData): Observable<any> {
    return this.http.post<any>(this.URL + "/products",product)
  }

  // UPDATE PRODUCT : Actualizar producto
  public updateProduct(id:string,product:FormData): Observable<any> {
    return this.http.patch<any>(this.URL + `/products/${id}`,product)
  }

  // DELETE PRODUCT : Eliminar producto
  public deleteProduct(id:string): Observable<any> {
    return this.http.delete<any>(this.URL + `/products/${id}`)
  }


}