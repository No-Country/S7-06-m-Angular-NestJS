import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../../models/store/order/order';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  URL = environment.baseUrl + "";

  constructor(private http:HttpClient) { }

  public getAll(): Observable<any> {
    return this.http.get<any>(this.URL + "/orders")
  }
  public saveOrder(order: Order): Observable<any>{
    return this.http.post<any>(this.URL + "/orders",order)
  }
  

  public update(id: string, order: Order): Observable<any>{
    return this.http.patch<any>(this.URL + `/orders/${id}`, order);
  }

  public delete(id: string){
    return this.http.delete<any>(this.URL + `/orders/${id}`);
  }
}
