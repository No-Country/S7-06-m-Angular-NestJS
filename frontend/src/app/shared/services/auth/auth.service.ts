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
    console.log("Petición a URL:")
    console.log(this.URL + '/auth/forgot')
    console.log("estas credendenciales: ",email)
    return this.http.post<any>(this.URL + '/auth/forgot',email)
  }

  // RESETEAR CONTRASEÑA
  resetPassword(password:string,token:string): Observable<any> {
    console.log("El Servicio de reseteo peticiona en la URL: ",this.URL + '/auth/reset/'+token)
    console.log("Y lleva la password: ",password)
    return this.http.post<any>(this.URL + `/auth/reset/${token}`,password)
  }  
}
