import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenService } from 'src/app/shared/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recover-form',
  templateUrl: './recover-form.component.html',
  styleUrls: ['./recover-form.component.css']
})
export class RecoverFormComponent implements OnInit {

  recoverForm:FormGroup;
  ocultar: boolean = true;
  isLogged:boolean=false;
  email:string="";
  emailUsuario: string="";
  password: string="";

  constructor(private formBuilder:FormBuilder, private router: Router,private authService:AuthService,private tokenService:TokenService) {
    this.recoverForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]]}
  )}

  ngOnInit(): void {}

  // OnRecover
  onRecover(event: any) {
    this.email = this.recoverForm.value;
    this.authService.recover(this.email).subscribe({
      next: (res) => {
        this.sendEmail()
      },
      error: (error) => {
        this.recoverError()
      },
      complete: () => {}
    })
  }

  // Properties Validators
  get Email() {
    return this.recoverForm.get('email')
  }

  // ALERT: Recuperación de contraseña 
  sendEmail() {
    Swal.fire({
      title: 'Recuperación de contraseña',
      text: "Hemos enviado un correo a tu email, para que puedas recuperar tu contraseña",
      icon: 'success',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('/home')
      } 
    })
  }
  // ALERT: Incorrect Email
  recoverError() {
    Swal.fire({
      title: 'Usuario NO registrado',
      text: 'El email ingresado no está registrado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Quiero registrarme'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('register')
      } else {
        this.router.navigateByUrl('login')
      }
    })
  }
}