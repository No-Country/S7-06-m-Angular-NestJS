import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser } from 'src/app/public/models/login-user';
import { NewUser } from 'src/app/public/models/new-user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL = environment.baseUrl + "";

  constructor(private http:HttpClient) { }

  // REGISTRARSE
  public register(newUser: NewUser): Observable<any> {
    return this.http.post<any>(this.URL + '/auth/register', newUser)
  }

  // LOGIN
  public login(loginUser: LoginUser): Observable<any> {
    return this.http.post<any>(this.URL + '/auth/login',loginUser)
  }  

  // LOGOUT
  public logOut(): void{
    window.sessionStorage.clear();
  }

  // RECUPERAR CONTRASEÑA
  public recover(email: string): Observable<any> {
    return this.http.post<any>(this.URL + '/auth/recover',email)
  }
}
