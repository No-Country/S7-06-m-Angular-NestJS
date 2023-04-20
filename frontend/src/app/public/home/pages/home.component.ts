import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, Product } from 'src/app/shared/models/store/products/product';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  products!:Product[];

  categories!:Category[];

  carrusel1!:string;

  carrusel2!:string;

  constructor(
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(){
    this.productService.getAllCategories().subscribe(data => {
      this.categories = data;
      this.randomCategory1()
    });
  }

  randomCategory1(){
    let max = this.categories.length - 1;
    let categoria1 = this.categories[Math.floor(Math.random() * max)];

    if(categoria1.name != 'libretas'){
      this.carrusel1 = categoria1.name;
      this.randomCategory2(categoria1.name, max);
    } else {
      this.randomCategory1();
    }
  }

  randomCategory2(category1:string, max:number){
    let categoria2 = this.categories[Math.floor(Math.random() * max)];

    if(categoria2.name != 'libretas' && categoria2.name != category1){
      this.carrusel2 = categoria2.name;
    } else {
      this.randomCategory2(category1, max);
    }
  }

  getProductsByCategory(category:string){
    this.productService.getProductByCategory(category).subscribe(data => {
      this.products = data;
    }, error => {
      console.log(error);
    });
  }

  navigateTo(route:string){
    this.router.navigate([route])
  }
}
