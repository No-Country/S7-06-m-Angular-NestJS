import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { NewUser } from 'src/app/shared/models/sign-in/new-user';
import { Cart } from 'src/app/shared/models/store/cart/cart';
import { Product } from 'src/app/shared/models/store/products/product';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-payment-resume',
  templateUrl: './payment-resume.component.html',
  styleUrls: ['./payment-resume.component.css']
})
export class PaymentResumeComponent implements OnInit {

  user = new NewUser();

  public payPalConfig?: IPayPalConfig;

  cartItems:Product[]=[];
  cart = new Cart();

  constructor(private sUser: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUser();
    this.getCart()

  }


  getUser(): void {
    this.user = this.sUser.getDataUser();
}

    getCart(){
        const productList = localStorage.getItem("Cart");
        if (productList){
            this.cart = JSON.parse(productList)
        }
    }


}
