import { Component, OnInit } from '@angular/core';
import { AuthHome } from '../../interfaces/auth-home';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-auth-home',
  templateUrl: './auth-home.component.html',
  styleUrls: ['./auth-home.component.css']
})
export class AuthHomeComponent implements OnInit {
  homeDetails: AuthHome;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getHomeDetails()
      .subscribe((homeDetails: AuthHome) => {
        this.homeDetails = homeDetails;
      });
  }
}
