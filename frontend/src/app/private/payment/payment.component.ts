import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  user = new User('','','','');

  constructor(private sUser: UserService) { }

  ngOnInit(): void {
    this.getUser();
  }


  getUser(): void {
    this.user = this.sUser.getDataUser();
  }

}
