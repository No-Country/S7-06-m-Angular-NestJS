import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.css']
})
export class EditProfileFormComponent implements OnInit {
  
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

