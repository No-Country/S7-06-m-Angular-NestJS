import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  data:any;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.data = this.userService.getDataUser()
    console.log(this.data)
  }

}
