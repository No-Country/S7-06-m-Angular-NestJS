import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/shared/models/store/cart/cart';
import { CartItem } from 'src/app/shared/models/store/cart/cartItem';
import { Product } from 'src/app/shared/models/store/products/product';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { SelectorComponent } from '../selector/selector.component';

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
    public dialog: MatDialog
  ) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });
  }

  removeFromCart(cartItem:any){
    this.cartService.removeFromCart(cartItem);
  }

  changeQuantity(cartItem:CartItem){
    let quantity = Number(cartItem.total);
    console.log('cant productos', quantity)

    this.cartService.changeQuantity(cartItem.product.id!, quantity);
  }

  openDialog(): void {
    this.dialog.open(SelectorComponent, {
      width: '500px'
    });
  }

  handleProduct(value:string, cartItem:CartItem){
    let active:any = document.getElementById('error')
    if(Number(cartItem.total) < 5 && value === 'add'){
      cartItem.total++
      this.changeQuantity(cartItem)
      // active.classList.remove('error-active');
    } else if( Number(cartItem.total) > 1 && value ==='remove'){
      cartItem.total--
      this.changeQuantity(cartItem)
    } else if(Number(cartItem.total) == 1 && value ==='remove'){
      // active.classList.add('error-active')
      this.openDialog();
      this.changeQuantity(cartItem)
    }
  }



  navigateToLogin(){
    this.router.navigateByUrl("/mimu/login")
  }
  // ------------------------------------------------------------------
  // priceTotal:number=0;
  // productsCart:ProductCart[]=[];

  // cantidad:number=0;

   ngOnInit(): void {
  //   this.getProductsOfCart();
  //   this.totalPrice();
   }


  // // Mostrar Productos Cargados
  // getProductsOfCart(){
  //   const productList = localStorage.getItem("productsCart");
  //   if (productList){
  //     this.productsCart = JSON.parse(productList);
  //   }
  // }

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
}
