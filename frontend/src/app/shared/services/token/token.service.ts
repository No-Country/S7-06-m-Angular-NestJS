import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken'
const EMAIL_KEY = 'UserEmail'
const AUTHORITIES_KEY = 'AuthAuthorities'
const FIRSTNAME_KEY = 'FirstName'
const LASTNAME_KEY = 'LastName'
const DNI_KEY = 'Dni'
const PHONE_KEY = 'Phone'
const USERID_KEY = 'UserId'
const ROL = 'Role'

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  
  roles: any;
  dato:any;

  constructor() {}

  // Token
  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY)
    window.sessionStorage.setItem(TOKEN_KEY, token)
  }
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY)!
  }  

  // Authorithies
  public setAuthorities(authorities: string[]): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY)
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities))
    console.log("set authotirities")
    console.log(authorities)
    console.log(typeof authorities)
    console.log(JSON.stringify(authorities))
  }
  public getAuthorities(): string[] {
    if (sessionStorage.getItem(AUTHORITIES_KEY)) {
      /*JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)!).forEach(
        (authority: { authority: string }) => {
          this.roles.push(authority.authority)
        }
      )*/
      this.roles = sessionStorage.getItem(AUTHORITIES_KEY)
    }
    console.log("get Authorities")
    console.log(this.roles)
    console.log(typeof this.roles)
    return this.roles
  }
}