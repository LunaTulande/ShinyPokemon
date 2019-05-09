import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';
import { AuthHome } from '../interfaces/auth-home';
import { catchError } from 'rxjs/operators';

// Add the RxJS Observable operators we need in this app. ??
import '../rxjs-operators';

@Injectable()
export class ProfileService extends BaseService {
  baseUrl: string;

  constructor(private http: Http, private configService: ConfigService) {
    super();
    this.baseUrl = configService.getApiURI();
  }

  private getHeaders(): Headers{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);
    return headers;
  }

  getUserDetails(): Observable<AuthHome> {
    let headers = this.getHeaders();
    return this.http.get(this.baseUrl + "/profile/authHome", { headers })
      .map(response => response.json())
      .catch(this.handleError);
  }

  addPokedexRegister(trainerId: number, pokemonId: number): Observable<any>{
    let headers = this.getHeaders();
    return this.http.post(this.baseUrl + "/profile/pokedexAdd/trainer/" + trainerId + "/pokemon/" + pokemonId, {}, { headers })
    .pipe(
      catchError(this.handleError)
    );
  }

  getPokedex(trainerId: number): Observable<number[]> {
    let headers = this.getHeaders();
    return this.http.get(this.baseUrl + "/profile/pokedex/trainer/" + trainerId, { headers })
    .map(Response => Response.json())
    .catch(this.handleError);
  }
}
