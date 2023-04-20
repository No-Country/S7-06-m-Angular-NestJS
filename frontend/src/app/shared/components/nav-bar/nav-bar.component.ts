import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { CartService } from '../../services/cart/cart.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  userData: any;
  isLogged:boolean=false;
  firstName:string="";

  rol: string = "";

  cartQuantity = 0;

  constructor(
    private router: Router,
    private userService: UserService,
    private cartService: CartService,
    private authService: AuthService
  ) {
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    });
  }

  ngOnInit(): void {
    this.statusLogin()
  }

  navigateToLoginOrUser() {
    const type = sessionStorage.getItem("AuthAuthorities");
    if (type?.includes("admin")) {
      this.rol = "admin";
      this.isLogged=true;
      this.router.navigateByUrl("/admin/dashboard")
    } else if (type?.includes("user")) {
      this.rol = "user";
      this.isLogged=true;
      this.router.navigateByUrl("/user/profile");
    } else {
      this.rol = "visit";
      this.router.navigateByUrl("/mimu/login")
    }
  }

  
  statusLogin(){
    const data = this.userService.getDataUser();
    if (data) {
      this.isLogged=true;
      this.firstName = data.firstName;
      console.log(data)
    } else {
      this.isLogged=false;
    }
  }

  onLogout(){
    this.authService.logOut();
    this.isLogged=false;
  }

  navigateToCart() {
    const type = sessionStorage.getItem("AuthAuthorities");
    if (type?.includes("user")) {
      this.router.navigateByUrl("/user/cart")
    } else {
      this.userNotLogged()
    }
  }

  navigateTo(route: string) {
    this.router.navigateByUrl(route)
  }

  // Alert: userNotLogged
  userNotLogged() {
    Swal.fire({
      title: 'Inicie sesión',
      text: 'Para poder comprar o visualizar los productos en el carrito se requiere loguearse',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Iniciar sesión'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('mimu/login')
      }
    })

  }



}
