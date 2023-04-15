import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { NewUser } from 'src/app/shared/models/sign-in/new-user';
import { Cart } from 'src/app/shared/models/store/cart/cart';
import { Product } from 'src/app/shared/models/store/products/product';
import { UserService } from 'src/app/shared/services/user/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})



export class PaymentComponent implements OnInit {

  checkForm:boolean=false;
  user = new NewUser();

  public payPalConfig?: IPayPalConfig;

  cartItems:Product[]=[];
  cart = new Cart();
  
  //Declaramos cotizacion dolar en moneda local de la tienda para conversión de paypal
  //En nuestro caso peso ARS con impuestos, porque paypal no tiene esa moneda
  usdCot:number = 400;


  constructor(private sUser: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUser();
    this.getCart()
    this.initConfig();
  }


  getUser(): void {
    this.user = this.sUser.getDataUser();
}

    getCart(){
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
            //Hacemos conversion de dolar
            let usdPrice =  it.product.price/this.usdCot

            item = {
                name: it.product.name,
                quantity: it.total,
                unit_amount: {value: usdPrice, currency_code: 'USD'},
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
                    value: (this.getTotal() / this.usdCot).toString(),
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: (this.getTotal() / this.usdCot).toString(),
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
