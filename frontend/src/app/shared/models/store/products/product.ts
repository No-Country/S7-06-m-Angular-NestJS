export class Image{
  id?:number;
  url!:string;
}

export class Category {
  id?: string;
  name!: string;
  products?: Product[];
}

export class Product{
  id?:string;
  name!:string;
  price!:number;
  discount?:number;
  finalPrice?:number;
  category!:Category[];
  images!:Image[];
  description?:string;
  stock?:boolean;
}
