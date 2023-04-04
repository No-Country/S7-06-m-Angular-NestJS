import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  url = "";
  user?:User;

  
  public detail(id: number): Observable<User>{
    return this.http.get<User>(this.url + `users/${id}`);
  }

  public update(id: number, user: User): Observable<any>{
    return this.http.put<User>(this.url + `users/${id}`, user);
  }

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

}
