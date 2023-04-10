export class Image{
  id?:number;
  url!:string;
}

export class Product{
  id?:number;
  name!:string;
  price!:number;
  discount?:number;
  finalPrice?:number;
  category!:string;
  images!:Image[];
  description?:string;
  stock?:boolean;
}
