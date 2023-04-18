import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.css']
})
export class EditProfileFormComponent implements OnInit {

  edit:boolean=false;

  editUser: any;
  

  constructor(private userService:UserService,private activatedRouter: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getData()

  }

  getData(){
    this.editUser = this.userService.getDataUser();
   }

  
  onUpdate(): void {
    this.userService.update(this.editUser.id, this.editUser).subscribe(
      data => {
        this.router.navigateByUrl('user/profile');
      },
      err => {
        alert("Error al editar perfil");
        this.router.navigateByUrl('user/profile');
      }
    );
  }

}

