import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  userData:any;

  constructor(private router: Router,private userService:UserService) { }

  ngOnInit(): void {
    this.userData = this.userService.getDataUser()
  }

  navigateToLoginOrUser(){
    if (this.userData){
      this.router.navigateByUrl("/user/profile")
    } else {
      this.router.navigateByUrl("/mimu/login")
    }

  }

  navigateTo(route:string){
    this.router.navigate([route])
  }
}
