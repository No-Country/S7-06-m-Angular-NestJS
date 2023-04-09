import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = new User('','','','');


  constructor(private router: Router, public sUser: UserService,private authService:AuthService) { }

  ngOnInit(): void {
    this.getUser();
  }


  getUser(): void {
    this.user = this.sUser.getDataUser();
  }

  navigateEdit(){
    this.router.navigate(['user/edit-profile'])
  }

  logOut(){
    this.authService.logOut();
    this.router.navigateByUrl("/mimu/home")
  }

  // ALERT: Close Session
  closeSession() {
    Swal.fire({
      title: '¿Desea cerrar sesión?',
      text: 'Será redirigido a la página inicial',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cerrar sesión'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.logOut();
        this.router.navigateByUrl('mimu/home')
      }
    })
  }
}
