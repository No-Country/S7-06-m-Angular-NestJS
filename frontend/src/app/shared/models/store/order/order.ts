

export class Order{
    id?:string; 
    isPaid?: boolean;
    createdAt?: string;
    totalPrice: number = 0;
    orderItems: OrderItem[] = [];

}


export class OrderItem{
    id?: string;
    name?: string;
    price?: number;
    quantity?: number;
}