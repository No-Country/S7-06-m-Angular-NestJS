import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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

}
