import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {

  edit:boolean=false;
  dataUser:any;
  

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.dataUser = this.userService.getDataUser()
  }

}
