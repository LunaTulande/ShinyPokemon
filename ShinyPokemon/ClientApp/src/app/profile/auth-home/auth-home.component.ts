import { Component, OnInit } from '@angular/core';
import { AuthHome } from '../../interfaces/auth-home';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-auth-home',
  templateUrl: './auth-home.component.html',
  styleUrls: ['./auth-home.component.css']
})
export class AuthHomeComponent implements OnInit {
  userDetails: AuthHome;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getUserDetails()
      .subscribe((homeDetails: AuthHome) => {
        this.userDetails = homeDetails;
      });
  }
}
