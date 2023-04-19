

export class Order{
    totalPrice: number = 0;
    orderItems: OrderItem[] = [];

}

export class OrderItem{
    id?: string;
    quantity?: number;
}