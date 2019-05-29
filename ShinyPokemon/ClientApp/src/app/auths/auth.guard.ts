import { Injectable } from './node_modules/@angular/core';
import { CanActivate, Router } from './node_modules/@angular/router';
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
