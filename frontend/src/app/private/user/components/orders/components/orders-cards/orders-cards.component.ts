import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/store/order/order';

@Component({
  selector: 'app-orders-cards',
  templateUrl: './orders-cards.component.html',
  styleUrls: ['./orders-cards.component.css']
})
export class OrdersCardsComponent implements OnInit {

  
  @Input()
  orders: Order[] = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}
