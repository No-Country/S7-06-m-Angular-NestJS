import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/store/order/order';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];

  constructor(private sOrder: OrderService) { }

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders():void{
    this.sOrder.getAll().subscribe({
      next: (res) => {
        this.orders = res;
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => {}
    })
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
