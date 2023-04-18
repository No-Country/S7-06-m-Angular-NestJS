import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  
  realRol: string="";

  constructor(private tokenService: TokenService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRol = route.data['expectedRol'];
    const roles = this.tokenService.getAuthorities();
    this.realRol = 'visit';
    if (roles.includes("admin")){
      this.realRol = 'admin'
    }
    if (this.tokenService.getToken() && this.realRol=='admin') {
      return true
    } else {
      this.router.navigateByUrl("/mimu/home")
      return false
    }
  }
}
