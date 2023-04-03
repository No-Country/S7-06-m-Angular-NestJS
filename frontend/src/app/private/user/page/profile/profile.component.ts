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

  user = new User("","","","");

  constructor(private router: Router, public sUser: UserService) { }

  ngOnInit(): void {
    this.loadProfile();
  }


  loadProfile(): void {
    this.sUser.detail(2).subscribe((data) => { this.user = data; 
      console.log(this.user) });
   
  }

  navigateEdit(){
    this.router.navigate(['user/edit-profile'])
  }
}
