import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { NewUser } from 'src/app/shared/models/sign-in/new-user';
import { Cart } from 'src/app/shared/models/store/cart/cart';
import { Order, OrderItem } from 'src/app/shared/models/store/order/order';
import { Product } from 'src/app/shared/models/store/products/product';
import { OrderService } from 'src/app/shared/services/order/order.service';
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

constructor(private sUser: UserService, private router: Router, private sOrder: OrderService) { }

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
                 this.paymentAlert('Tu compra fue realizada con éxito','En breve nos contactaremos','success',false);
                 localStorage.removeItem('Cart');
                }
                }
            )
        }


//integracion de Mercado Pago
    payToMP = async () =>{
        const items: any[] = [];
        let newItem = {};
        this.cart.items.forEach((it: any)=>{
        
            newItem = {
                    title: it.product.name,
                    description: it.product.description,
                    picture_url: it.product.images[1],
                    category_id: '..',
                    quantity: it.total,
                    currency_id: 'ARS',
                    unit_price: it.product.price, 
                };
        items.push(newItem);
        });
        let response = await fetch('https://api.mercadopago.com/checkout/preferences',{
                
            method:"POST",
            headers:{
                Authorization: 'Bearer TEST-467669511262743-041613-6c78f4b93c737407adacd38258c59972-808806188'
            },
            body: JSON.stringify({
                items: items
                })
            })
            let data = await response.json();
            window.open(data.init_point,'_blank')
        }




 //implementacion paypal       
    getItemsList(): any[]{
        const items: any[] = [];
        let item = {};
        this.cart.items.forEach((it: any)=>{
            //Hacemos conversion de dolar
            let usdPrice =  it.product.price/this.usdCot

            item = {
                id: it.product.id,
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
                    this.postOrder();
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
