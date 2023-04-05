import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dataUser:any;

  constructor(private userService:UserService, private route:Router) { }

  ngOnInit(): void {
    this.dataUser = this.userService.getDataUser()
    console.log(this.dataUser)
  }

  navigateTo(route:string){
    this.route.navigateByUrl(route)
  }

}
