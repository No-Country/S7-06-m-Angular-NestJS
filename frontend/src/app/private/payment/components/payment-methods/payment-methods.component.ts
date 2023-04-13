import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { ProductCart } from 'src/app/private/cart/models/productCart';
import { NewUser } from 'src/app/shared/models/sign-in/new-user';
import { Cart } from 'src/app/shared/models/store/cart/cart';
import { CartItem } from 'src/app/shared/models/store/cart/cartItem';
import { Product } from 'src/app/shared/models/store/products/product';
import { UserService } from 'src/app/shared/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.css']
})
export class PaymentMethodsComponent implements OnInit {

  user = new NewUser();

  public payPalConfig?: IPayPalConfig;

  cartItems:Product[]=[];
  cart = new Cart();


  constructor(private sUser: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUser();
    this.getProductsOfCart()
    this.initConfig();
  }


  getUser(): void {
    this.user = this.sUser.getDataUser();
}

    getProductsOfCart(){
        const productList = localStorage.getItem("Cart");
        if (productList){
            this.cart = JSON.parse(productList)
        }
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



paymentAlert(title:string, text:string, icon:any, cancel:boolean) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: cancel,
      cancelButtonText:'Entendido',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Volver al inicio'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('mimu/home')
      }
    })
  }





}
