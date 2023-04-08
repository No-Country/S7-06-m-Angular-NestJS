import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/shared/models/login/login-user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { UserService } from 'src/app/shared/services/user.service';
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
  usuarioHardcodeado={email:"juan@email.com",password:"Caballo1@"};
  dataUsuarioHardcodeado={
    id:"262cf7bd-2f93-4f61-91d9-b3c9f8134181",
    email:"juan@email.com",
    firstName:"Juan",
    lastName:"Gutierrez",
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI2MmNmN2JkLTJmOTMtNGY2MS05MWQ5LWIzYzlmODEzNDE4MSIsImlhdCI6MTY4MDY1Njg0NiwiZXhwIjoxNjgwNjYwNDQ2fQ.6bg33oYcdCoTih9W2_9bY0ANpgKduZyLL0ZX8wRRu_Y"
  }

  constructor(private formBuilder:FormBuilder, private router: Router,private userService:UserService,private authService:AuthService,private tokenService:TokenService) {
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
    console.log(this.loginUser);
    if (this.loginUser.email=="juan@email.com"&&this.loginUser.password=="Caballo1@"){
      sessionStorage.setItem("Role","User")
      this.userService.saveDataUser(this.dataUsuarioHardcodeado);      
      this.router.navigateByUrl('mimu/home')
    } else {
    this.authService.login(this.loginUser).subscribe({
      next: (res) => {
        this.isLogged = true;
        this.tokenService.setToken(res.token);
        this.userService.saveDataUser(res);
        sessionStorage.setItem("Role","Admin")
        this.router.navigateByUrl('mimu/home')
      },
      error: (error) => {
        console.error(error)
        this.wrongUser()
      },
      complete: () => {}
    })}
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
        this.router.navigateByUrl('mimu/register')
      }
    })
  }
}


