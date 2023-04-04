import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = new User('','','','');


  constructor(private router: Router, public sUser: UserService) { }

  ngOnInit(): void {
    this.getUser();
  }


  getUser(): void {
    this.user = this.sUser.getDataUser();
  }

  navigateEdit(){
    this.router.navigate(['user/edit-profile'])
  }
}
