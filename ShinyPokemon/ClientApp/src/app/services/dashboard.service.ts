import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';
import { AuthHome } from '../interfaces/auth-home';

// Add the RxJS Observable operators we need in this app. ??
import '../rxjs-operators';

@Injectable()
export class DashboardService extends BaseService {
  baseUrl: string = '';

  constructor(private http: Http, private configService: ConfigService) {
    super();
    this.baseUrl = configService.getApiURI();
  }

  getHomeDetails(): Observable<AuthHome> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http.get(this.baseUrl + "/dashboard/authHome", { headers })
      .map(response => response.json())
      .catch(this.handleError);
  }
}
