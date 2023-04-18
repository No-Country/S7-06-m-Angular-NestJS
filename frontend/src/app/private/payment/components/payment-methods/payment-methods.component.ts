import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NewUser } from 'src/app/shared/models/sign-in/new-user';
import { Cart } from 'src/app/shared/models/store/cart/cart';
import { Order, OrderItem } from 'src/app/shared/models/store/order/order';
import { Product } from 'src/app/shared/models/store/products/product';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-payment-methods',
    templateUrl: './payment-methods.component.html',
    styleUrls: ['./payment-methods.component.css']
})
export class PaymentMethodsComponent implements OnInit {
  
  user!:NewUser;
  edit:boolean=false;

  
  cartItems:Product[]=[];
  cart = new Cart();

  constructor(private sUser: UserService, private router: Router, private sOrder: OrderService) { }

  ngOnInit(): void {
    this.getUser();
  }


  getUser(): void {
    this.user = this.sUser.getDataUser();
  }
  

//post Order
getOrderItems(): OrderItem[]{
  const orderItems: OrderItem[] = [];
  let orderItem = {};
  this.cart.items.forEach((it: any)=>{
   
      orderItem = {
          id: it.product.id,
          quantity: it.total,
          };
      orderItems.push(orderItem);
      });
      return orderItems;
  }
  
  
postOrder(){
      const newOrder = new Order();
      newOrder.totalPrice = this.cart.totalPrice;
      newOrder.orderItems = this.getOrderItems();

      this.sOrder.saveOrder(newOrder).subscribe({
          next: (_res) => {
          },
          error: (error) => {
          console.log(error)
          },
          complete:()=>{
           localStorage.removeItem('Cart');
          }
          }
      )
  }



  confirmData(){
    const type = sessionStorage.getItem("dataUser");
    if (type?.includes("firstName") && 
        type?.includes("lastName") && 
        type?.includes("email") //&& 
//      type?.includes("contact") && 
//      type?.includes("address")
          ){
     this.postOrder(); 
     this.router.navigateByUrl('user/banking')
    } else {
      this.userDataIncomplete()
    }
  }
  userDataIncomplete(){
    Swal.fire({
      title: 'Informacion Incompleta',
      text: 'Por favor, verifique si ha completado todos sus datos de usuario para poder confirmar su compra',
      icon: 'info',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Entendido'
    })

  }
}








