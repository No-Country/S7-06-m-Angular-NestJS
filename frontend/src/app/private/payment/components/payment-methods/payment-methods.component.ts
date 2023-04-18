import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NewUser } from 'src/app/shared/models/sign-in/new-user';
import { Cart } from 'src/app/shared/models/store/cart/cart';
import { Product } from 'src/app/shared/models/store/products/product';
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

  constructor(private sUser: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }


  getUser(): void {
    this.user = this.sUser.getDataUser();
  }
  
  // ALERT: Payment Successful
  paymentSuccess() {
    Swal.fire({
      title: 'Tu pago se realizó con éxito',
      text: 'No  de confirmación de orden 428764. Lo tienes en tu mail',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Volver al inicio'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('mimu/home')
      }
    })
  }

//  && 
//  type?.includes("contact") && 
//  type?.includes("address"))


  confirmData(){
    const type = sessionStorage.getItem("dataUser");
    if (type?.includes("firstName") && 
        type?.includes("lastName") && 
        type?.includes("email")
          ){

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








