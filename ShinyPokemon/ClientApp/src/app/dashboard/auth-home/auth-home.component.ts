import { Component, OnInit } from '@angular/core';
import { AuthHome } from '../../interfaces/auth-home';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-auth-home',
  templateUrl: './auth-home.component.html',
  styleUrls: ['./auth-home.component.css']
})
export class AuthHomeComponent implements OnInit {
  homeDetails: AuthHome;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getHomeDetails()
      .subscribe((homeDetails: AuthHome) => {
        this.homeDetails = homeDetails;
      });
  }
}
