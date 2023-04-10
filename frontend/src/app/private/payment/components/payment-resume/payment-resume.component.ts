import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-resume',
  templateUrl: './payment-resume.component.html',
  styleUrls: ['./payment-resume.component.css']
})
export class PaymentResumeComponent implements OnInit {
  delivery:number = 8.89;
  price:number = 24.78;
  
  user = new User('','','','');


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
}
