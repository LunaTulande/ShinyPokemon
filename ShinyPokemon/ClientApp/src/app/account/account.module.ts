import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FacebookLoginComponent } from './facebook-login/facebook-login.component';
import { FormsModule } from '@angular/forms';
import { EmailValidator } from '../utils/email-validator.directive';
import { LoginService } from '../services/login.service';

@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  declarations: [
    RegistrationFormComponent, EmailValidator, LoginFormComponent, FacebookLoginComponent
  ],
  providers: [LoginService]
})
export class AccountModule { }
