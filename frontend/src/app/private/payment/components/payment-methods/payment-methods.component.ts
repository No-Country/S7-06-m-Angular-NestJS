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


    getTotal(): number{
        let total = 0;
        total += this.cart.totalPrice;
        return total;
    }

    getItemsList(): any[]{
        const items: any[] = [];
        let item = {};
        this.cart.items.forEach((it: any)=>{
            item = {
                name: it.product.name,
                quantity: it.total,
                unit_amount: {value: it.product.price, currency_code: 'USD'},
            };
        items.push(item);

        });
        return items;
    }

  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'AW0wgLK6b1xefxnZBCQBdOUTVSaaMisbl9IgNNb1T4W59lL2Onn5roCtYEh9-EmbyBAIqOswduAjCq5m',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: this.getTotal().toString(),
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: this.getTotal().toString(),
                        }
                    }
                },
                items: this.getItemsList(),
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details:any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
                this.paymentAlert('El pago fue aprobado!','En breve nos contactaremos','success',false);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point',data);
        },
        onError: err => {
            console.log('OnError', err);
            this.paymentAlert('Ups..','Parece que ha ocurrido un error.','error', true);
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            this.paymentAlert('La operacion se detuvo voluntariamente.','Puede volver a iniciarla cuando guste.','error', true);
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
        }
    };
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








