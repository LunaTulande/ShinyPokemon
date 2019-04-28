import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private user: LoginService, private router: Router) { }

  canActivate()
    // next: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean 
    {
    if (!this.user.isLoggedIn()) {
      this.router.navigate(['/account/login']);
      return false;
    }

    return true;
  }
}
