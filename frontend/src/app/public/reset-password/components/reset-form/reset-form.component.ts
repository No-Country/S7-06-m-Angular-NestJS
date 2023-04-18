import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-form',
  templateUrl: './reset-form.component.html',
  styleUrls: ['./reset-form.component.css']
})
export class ResetFormComponent implements OnInit {

  resetPasswordForm: FormGroup;
  ocultar: boolean = true;
  newPassword:string="";
  @Input() token:string="";

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router:Router) {

    this.resetPasswordForm = this.formBuilder.group(
      {
        password: ['',[Validators.required, Validators.minLength(8),Validators.maxLength(22),Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])/)]],
        confirm_Password: ['',[Validators.required, Validators.minLength(8),Validators.maxLength(22),Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])/),this.checkPasswords('password')]]
      }
    )
  }

  ngOnInit(): void {
  }

  // REGISTER
  onResetPassword() {
    this.newPassword = this.resetPasswordForm.value;
    console.log(this.newPassword)
    this.authService.resetPassword(this.newPassword,this.token).subscribe({
      next: (data) => {
        this.resetedPassword()
      },
      error: (error) => {
        this.wrongRegister()
      },
      complete:()=>{}
    })
  }

  // ALERT: Usuario registrado
  resetedPassword() {
    Swal.fire({
      title: 'Contraseña actualizada',
      text: "Su contraseña fue modificada exitosamente. Inicie sesión con sus nuevas credenciales.",
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

  // ALERT: ERROR
  wrongRegister() {
    Swal.fire({
      title: 'Error',
      text: "Por algún motivo relacionado con unos y ceros, no se pudo actializar tu contrseña",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Intentar nuevamente'
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('/user/resetpassword/:token?')
      } else {
        this.router.navigateByUrl('/home')
      }
    })
  }

  /*=================================================*/

  // VALIDATORS
  get Password() {
    return this.resetPasswordForm.get('password')
  }
  get ConfirmPassword(){
    return this.resetPasswordForm.get('confirm_Password')
  }

  /*=================================================*/

  // Password Comparator
  checkPasswords (passwordControl: string) {
    let password: FormControl;
    let confirm_Password: FormControl;
    return function checkPasswords (control: FormControl) {
      if (!control.parent) {
        return null;
      }
      if (!password) {
        password = control;
        confirm_Password = control.parent.get(passwordControl) as FormControl;
        if (!confirm_Password) {
          throw new Error('checkPasswords(): other control is not found in parent group');
        }
        confirm_Password.valueChanges.subscribe(() => {
          password.updateValueAndValidity();
        });
      }
      if (!password) {
        return null;
      }
      if (password.value !== confirm_Password.value) {
        return {
          matchOther: true
        };
      }
      return null;
    }
  }


}