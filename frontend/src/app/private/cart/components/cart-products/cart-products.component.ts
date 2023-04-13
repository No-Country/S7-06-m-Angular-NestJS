import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/shared/models/store/cart/cart';
import { CartItem } from 'src/app/shared/models/store/cart/cartItem';
import { Product } from 'src/app/shared/models/store/products/product';
import { CartService } from 'src/app/shared/services/cart/cart.service';

@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.css']
})

export class CartProductsComponent implements OnInit {

  cart!:Cart;

  product!:Product;

  constructor(
    private router:Router,
    private cartService: CartService,
  ) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });
  }

  ngOnInit(): void {

  }

  removeFromCart(cartItem:any){
    this.cartService.removeFromCart(cartItem);
  }

  changeQuantity(cartItem:CartItem){
    let quantity = Number(cartItem.total);
    console.log('cant productos', quantity)

    this.cartService.changeQuantity(cartItem.product.id!, quantity);
  }

  handleProduct(value:string, cartItem:CartItem){
    let active:any = document.getElementById('error')
    if(Number(cartItem.total) < 5 && value === 'add'){
      cartItem.total++
      this.changeQuantity(cartItem)
      console.log(cartItem.total)
      active.classList.remove('error-active');
    } else if( Number(cartItem.total) > 1 && value ==='remove'){
      cartItem.total--
      this.changeQuantity(cartItem)
      console.log(cartItem.total)
    } else if(Number(cartItem.total) == 1 && value ==='remove'){
      active.classList.add('error-active')
      this.changeQuantity(cartItem)
    }
  }

  // deleteProductOfCart(index: number) {
  //   this.productsCart.splice(index, 1);
  //   this.priceTotal = 0;
  //   this.totalPrice()
  // }
  // updateAmount(index: number, nuevaCantidad: number) {
  //   this.productsCart[index].amount = nuevaCantidad;
  //   this.priceTotal = 0;
  //   this.totalPrice()
  // }

  // totalPrice(){
  //   this.productsCart.forEach((product)=>{
  //     this.priceTotal = this.priceTotal + product.amount*product.price
  //   })
  // }

  navigateToLogin(){
    this.router.navigateByUrl("/mimu/login")
  }
}
