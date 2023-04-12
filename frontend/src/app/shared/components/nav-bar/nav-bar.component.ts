import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  userData:any;

  rol:string="";

  cartQuantity = 0;

  constructor(
    private router: Router,
    private userService:UserService,
    private cartService: CartService
  ) {
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    });
  }

  ngOnInit(): void {

  }

  navigateToLoginOrUser(){
    this.userData = this.userService.getDataUser();
    const role=sessionStorage.getItem("Role")
    if (role){
      this.rol=role
    }
    if (this.userData&&this.rol=="User"){
      this.router.navigateByUrl("/user/profile")
    } else if (this.userData&&this.rol=="Admin") {
      this.router.navigateByUrl("/admin/dashboard")
    } else {
      this.router.navigateByUrl("/mimu/login")
    }

  }

  navigateTo(route:string){
    this.router.navigate([route])
  }
}
