export class Image{
  id?:number;
  url!:string;
}

export class Categories {
  id?:string;
  name!:string;
}

export class Product{
  id?:string;
  name!:string;
  price!:number;
  discount?:number;
  finalPrice?:number;
  category!:Categories[];
  images!:Image[];
  description?:string;
  stock?:boolean;
}
