import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { NewUser } from 'src/app/shared/models/sign-in/new-user';
import { UserService } from 'src/app/shared/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.css']
})
export class PaymentMethodsComponent implements OnInit {
  
  delivery:number = 8.89;
  price:number = 24.78;

  total:number = this.delivery + this.price
  
  user = new NewUser();

  public payPalConfig?: IPayPalConfig;

  constructor(private sUser: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUser();

    this.initConfig();
  }

  getUser(): void {
    this.user = this.sUser.getDataUser();
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
                    value: this.total.toString(),
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: this.total.toString(),
                        }
                    }
                },
                items: [{
                    name: 'Envío',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'USD',
                        value: this.delivery.toString(),
                    },
                },
                {
                    name: 'Subtotal',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'USD',
                        value: this.price.toString(),
                    },
                }]
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
                this.paymentAlert('El pago fue aprovado',details,'success');
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
        },
        onError: err => {
            console.log('OnError', err);
            this.paymentAlert('Ha ocurrido un error',err,'error');
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
        }
    };
}



paymentAlert(title:string, text:string, icon:any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Volver al inicio'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('mimu/home')
      }
    })
  }





}
