import { Product } from '../products/product';

export class CartItem{
  constructor(public product:Product){}
  products!:Product[];
  total:number = 1;
  price:number = this.product.price;
}
