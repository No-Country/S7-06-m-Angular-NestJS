import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCart } from '../../models/productCart';

@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.css']
})
export class CartProductsComponent implements OnInit {

  priceTotal:number=0;
  productsCart:ProductCart[]=[];

  cantidad:number=0;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.getProductsOfCart();
    this.totalPrice();
  }

  // Mostrar Productos Cargados
  getProductsOfCart(){
    const productList = localStorage.getItem("productsCart");
    if (productList){
      this.productsCart = JSON.parse(productList);
    }    
  }

  deleteProductOfCart(index: number) {
    this.productsCart.splice(index, 1);
    this.priceTotal = 0;
    this.totalPrice()
  }
  
  updateAmount(index: number, nuevaCantidad: number) {
    this.productsCart[index].amount = nuevaCantidad;
    this.priceTotal = 0;
    this.totalPrice()
  }

  totalPrice(){
    this.productsCart.forEach((product)=>{
      this.priceTotal = this.priceTotal + product.amount*product.price
    })
  }

  navigateToLogin(){
    this.router.navigateByUrl("/mimu/login")
  }
}
