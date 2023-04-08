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

  productsCart:ProductCart[]=[
    {
      name:"Jabon",
      price:20,
      img:"https://amelipapeleria.uy/wp-content/uploads/2023/02/Cuaderno-caballito-01-300x300.jpeg",
      amount:1
    },
    {
      name:"Shampoo",
      price:45,
      img:"https://amelipapeleria.uy/wp-content/uploads/2023/02/Cuaderno-caballito-01-300x300.jpeg",      
      amount:1
    },
    {
      name:"Deterwater",
      price:87,
      img:"https://amelipapeleria.uy/wp-content/uploads/2023/02/Cuaderno-caballito-01-300x300.jpeg",
      amount:1
    }
  ]

  cantidad:number=0;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.totalPrice()
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
