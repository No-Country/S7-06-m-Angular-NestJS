export interface ProductAdmin {
    id:string;
    name:string;
    description:string;
    price:number;
    images:Img[];
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