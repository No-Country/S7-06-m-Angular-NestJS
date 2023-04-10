import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser } from 'src/app/shared/models/login/login-user';
import { NewUser } from 'src/app/shared/models/sign-in/new-user';
import { environment } from 'src/environments/environment';
import { LOGIN_URL, REGISTER_URL } from '../../endpoints/endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL = environment.baseUrl + "";

  constructor(private http:HttpClient) { }

  // REGISTRARSE
  register(newUser: NewUser): Observable<any> {
    return this.http.post<any>(REGISTER_URL, newUser)
  }

  // LOGIN
  login(loginUser: LoginUser): Observable<any> {
    return this.http.post<any>(LOGIN_URL, loginUser)
  }

  // LOGOUT
  logOut(): void{
    window.sessionStorage.clear();
  }

  // RECUPERAR CONTRASEÑA
  recover(email: string): Observable<any> {
    return this.http.post<any>(this.URL + '/auth/recover',email)
  }

  // RESETEAR CONTRASEÑA
  resetPassword(password: string): Observable<any> {
    return this.http.post<any>(this.URL + '/auth/resetpassword',password)
  }


}
