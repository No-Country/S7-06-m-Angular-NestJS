import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewUser } from 'src/app/shared/models/sign-in/new-user';
import { AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  registerForm: FormGroup;
  newUser!: NewUser;
  ocultar: boolean = true;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router:Router) {

    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['',[Validators.required, Validators.minLength(8),Validators.maxLength(22),Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])/)]],
        confirmPassword: ['',[Validators.required, Validators.minLength(8),Validators.maxLength(22),Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])/),this.checkPasswords('password')]]
      }
    )
  }



  ngOnInit(): void {
  }

  // REGISTER
  onRegister() {
    this.newUser = this.registerForm.value;
    console.log(this.newUser)
    this.authService.register(this.newUser).subscribe({
      next: (data) => {
        this.registeredUser()
      },
      error: (error) => {
        this.wrongRegister()
      },
      complete:()=>{}
    })
  }

  // ALERT: Usuario registrado
  registeredUser() {
    Swal.fire({
      title: 'Usuario Registrado',
      text: "Hemos enviado un correo a tu email, para que verifiques tu cuenta y puedas realizar una compra en MimuStore",
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Iniciar Sesión'
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('/auth/login')
      } else {
        this.router.navigateByUrl('/home')
      }
    })
  }

  // ALERT: Registro Incorrecto
  wrongRegister() {
    Swal.fire({
      title: 'Error en el registro',
      text: "Por algún motivo relacionado con unos y ceros, no podemos registrarte",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Intentar nuevamente'
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('/register')
      } else {
        this.router.navigateByUrl('/home')
      }
    })
  }

  /*=================================================*/

  // VALIDATORS
  get FirstName() {
    return this.registerForm.get('firstName')
  }
  get LastName() {
    return this.registerForm.get('lastName')
  }
  get Email() {
    return this.registerForm.get('email')
  }
  get Password() {
    return this.registerForm.get('password')
  }
  get ConfirmPassword(){
    return this.registerForm.get('confirmPassword')
  }

  /*=================================================*/

  // Password Comparator
  checkPasswords (passwordControl: string) {
    let password: FormControl;
    let confirmPassword: FormControl;
    return function checkPasswords (control: FormControl) {
      if (!control.parent) {
        return null;
      }
      if (!password) {
        password = control;
        confirmPassword = control.parent.get(passwordControl) as FormControl;
        if (!confirmPassword) {
          throw new Error('checkPasswords(): other control is not found in parent group');
        }
        confirmPassword.valueChanges.subscribe(() => {
          password.updateValueAndValidity();
        });
      }
      if (!password) {
        return null;
      }
      if (password.value !== confirmPassword.value) {
        return {
          matchOther: true
        };
      }
      return null;
    }
  }


}
