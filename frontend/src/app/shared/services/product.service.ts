import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
  
}
