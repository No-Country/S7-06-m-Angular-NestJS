import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { NewUser } from '../../models/sign-in/new-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLogged:boolean=false;

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

  public getUserID(){
    const userID = sessionStorage.getItem('dataUser.id')
    if (userID){
      return JSON.parse(userID)
    }
  }

  public update(id: number, user: NewUser): Observable<NewUser>{
    return this.http.patch<NewUser>(this.URL + `/update/${id}`, user);
  }

}
