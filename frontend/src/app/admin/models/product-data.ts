export interface ProductData {
    id?:string;
    name:string;
    description:string;
    price:number;
    images:File;
    categories:Categories;
}

export interface Categories {
    id:string;
    name:string;
}

export interface Img {
    id:string;
    url:string;
}