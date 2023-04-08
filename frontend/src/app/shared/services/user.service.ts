import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL = environment.baseUrl + "/auth";

  constructor(private http: HttpClient) { }

  public saveDataUser(data:any){
    const dataUser = JSON.stringify(data);
    sessionStorage.setItem("dataUser",dataUser) 
  }

  public getDataUser(){
    const dataUser = sessionStorage.getItem("dataUser")
    if (dataUser){
      return JSON.parse(dataUser)
    }
  }


  public update(id: number, user: User): Observable<User>{
    return this.http.patch<User>(this.URL + `/update/${id}`, user);
  }

}
