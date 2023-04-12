import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ProductCart } from '../../models/productCart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  data:any;

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

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.data = this.userService.getDataUser()
    console.log(this.data)
    this.loadProductsToCart()
  }

  loadProductsToCart(){
    const productList = JSON.stringify(this.productsCart)
    localStorage.setItem("productsCart",productList) 
  }

}
