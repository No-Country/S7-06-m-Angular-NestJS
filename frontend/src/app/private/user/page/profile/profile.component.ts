import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewUser } from 'src/app/shared/models/sign-in/new-user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!:NewUser;

  viewMyOrders = false;

  constructor(
    private router: Router,
    private sUser: UserService,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.user = this.sUser.getDataUser();
  }

  navigateEdit(){
    this.router.navigate(['user/edit-profile'])
  }

  logOut(){
    this.authService.logOut();
    this.router.navigateByUrl("/mimu/home")
  }

  viewOrders(){
    this.viewMyOrders = !this.viewMyOrders
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
