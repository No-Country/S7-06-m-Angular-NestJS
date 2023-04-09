export class Product{
  id?:number;
  name!:string;
  price!:number;
  discount?:number;
  finalPrice?:number;
  category!:string;
  images!:string[];
  description?:string;
  stock?:boolean;
}
