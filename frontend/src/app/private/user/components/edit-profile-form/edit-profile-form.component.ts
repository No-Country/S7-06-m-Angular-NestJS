import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.css']
})
export class EditProfileFormComponent implements OnInit {
  
  user = new User('','','','');
  
  @ViewChild('myForm') myForm!: NgForm;
  
  formChanged = false;

  constructor(private sUser: UserService) { }

  ngOnInit(): void {
    this.getUser();

 
    if (this.myForm?.valueChanges) { 
      this.myForm.valueChanges.subscribe(() => {
        this.formChanged = true;
      });
    }
  }

  
  getUser(): void {
    this.user = this.sUser.getDataUser();
  }

  onSubmit() {
    this.sUser.saveDataUser(this.user);

    this.myForm.reset();

    this.formChanged = false;
  }
}

