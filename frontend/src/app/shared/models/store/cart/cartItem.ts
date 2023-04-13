import { Product } from '../products/product';

export class CartItem{
  constructor(
    public product: Product,
    public quantityTotal: number
  ){
    this.total = quantityTotal;
    this.price = this.product.price * this.total;
  }
  total:number;
  price:number;
}
