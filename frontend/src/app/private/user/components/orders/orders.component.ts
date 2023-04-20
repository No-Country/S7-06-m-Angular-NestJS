
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { OrderItem } from 'src/app/shared/models/store/order/order';
import { Order } from 'src/app/shared/models/store/order/order';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {


  orders: Order[] = [];
  order = new Order;
  

  constructor(private sOrder: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders():void{
    this.sOrder.getAll().pipe(
      map((res: Array<Order>) => {
        const orders = res.map((order: any) => {
          const items = order.items.map((item:OrderItem) => {
            const orderItem: OrderItem = {
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity
            };
            return orderItem;
          });
          return {
            id: order.id,
            totalPrice: order.totalPrice,
            isPaid: order.isPaid,
            createdAt: order.createdAt,
            orderItems: items
          };
        });
        return orders;
      })
    ).subscribe({
      next: (res) => {
        this.orders = res;
        console.log(this.orders)
    },
      error: (error) => {
        console.error(error);
      },
      complete: () => {}
    });
  }


  getOrderItems(): OrderItem[]{
    const orderItems: OrderItem[] = [];
    let orderItem = {};
    for (let order of this.orders){
      this.order.orderItems.forEach((it: any)=>{
     
        orderItem = {
            id: it.product.id,
            quantity: it.total,
            };
        orderItems.push(orderItem);
        });
       
    }
    return orderItems;
   
    }
    
    
  

  
  deleteOrder(id?:string){
    if (id != undefined) {
      this.sOrder.delete(id).subscribe(data => {
        this.getOrders();
      }, err => {
        alert("Falló.");
      })
    }
  }

}
