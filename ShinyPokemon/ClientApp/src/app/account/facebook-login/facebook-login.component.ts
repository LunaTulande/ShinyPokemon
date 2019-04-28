import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-facebook-login',
  templateUrl: './facebook-login.component.html',
  styleUrls: ['./facebook-login.component.css']
})
export class FacebookLoginComponent {
  private authWindow: Window;
  failed: boolean;
  error: string;
  errorDescription: string;
  isRequesting: boolean;

  constructor(private loginService: LoginService, private router: Router) {
    if (window.addEventListener) {
      window.addEventListener("message", this.handleMessage.bind(this), false);
    } else {
      (<any>window).attachEvent("onmessage", this.handleMessage.bind(this));
    }
  }

  launchFbLogin() {
    // Launch facebook login dialog
    this.authWindow = window.open('https://www.facebook.com/v3.2/dialog/oauth?&response_type=token&display=popup&client_id=402398470574692&display=popup&redirect_uri=http://localhost:50455/facebook-auth.html&scope=email', null, 'width=600,height=400');    
  }

  handleMessage(event: Event) {
    const message = event as MessageEvent;
    // Only trust messages from the below origin.
    if (message.origin !== "http://localhost:50455") return;

    this.authWindow.close();

    const result = JSON.parse(message.data);
    if (!result.status) {
      this.failed = true;
      this.error = result.error;
      this.errorDescription = result.errorDescription;
    }
    else {
      this.failed = false;
      this.isRequesting = true;

      this.loginService.facebookLogin(result.accessToken)
        .finally(() => this.isRequesting = false)
        .subscribe(
          result => {
            if (result) {
              this.router.navigate(['/']);
            }
          },
          error => {
            this.failed = true;
            this.error = error;
          });
    }
  }
}
