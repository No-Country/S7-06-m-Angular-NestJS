import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/public/models/login-user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenService } from 'src/app/shared/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm:FormGroup;
  ocultar: boolean = true;
  isLogged:boolean=false;
  loginUser: LoginUser={email:"",password:""};
  emailUsuario: string="";
  password: string="";

  constructor(private formBuilder:FormBuilder, private router: Router,private authService:AuthService,private tokenService:TokenService) {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['',[Validators.required, Validators.minLength(8),Validators.maxLength(25),Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])/)]]
      }
  )}

  ngOnInit(): void {}

  // OnLogin
  onLogin(event: any) {
    this.loginUser = this.loginForm.value;
    this.authService.login(this.loginUser).subscribe({
      next: (res) => {
        this.isLogged = true;
        this.tokenService.setToken(res.data.token);
        console.log("Usuario logueado")
      },
      error: (error) => {
        console.error(error)
        this.wrongUser()
      },
      complete: () => {}
    })
  }

  // Properties Validators
  get Email() {
    return this.loginForm.get('email')
  }
  get Password() {
    return this.loginForm.get('password')
  }

  // ALERT: Incorrect User
  wrongUser() {
    Swal.fire({
      title: 'Usuario NO registrado',
      text: 'Datos incorrectos, o bien el usuario no está registrado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Quiero registrarme'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('register')
      }
    })
  }
}
