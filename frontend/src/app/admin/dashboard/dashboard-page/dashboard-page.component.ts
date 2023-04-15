import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  dataUser:any;

  constructor(private userService:UserService, private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
    this.dataUser = this.userService.getDataUser()
  }

  navigateTo(route:string){
    this.router.navigateByUrl(route)
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