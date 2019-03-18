import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthHomeComponent } from './auth-home/auth-home.component';
import { AuthGuard } from '../utils/auth.guard';
import { DashboardService } from '../services/dashboard.service';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [AuthHomeComponent],
  providers: [AuthGuard, DashboardService]
})
export class DashboardModule { }
