import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthHomeComponent } from './auth-home/auth-home.component';
import { AuthGuard } from '../utils/auth.guard';
import { ProfileService } from '../services/profile.service';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [AuthHomeComponent],
  providers: [AuthGuard, ProfileService]
})
export class ProfileModule { }
