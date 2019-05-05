import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';
import { AuthHome } from '../interfaces/auth-home';
import { catchError } from 'rxjs/operators';

// Add the RxJS Observable operators we need in this app. ??
import '../rxjs-operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ProfileService extends BaseService {
  baseUrl: string = '';

  constructor(private http: Http, private configService: ConfigService) {
    super();
    this.baseUrl = configService.getApiURI();
  }

  getUserDetails(): Observable<AuthHome> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http.get(this.baseUrl + "/profile/authHome", { headers })
      .map(response => response.json())
      .catch(this.handleError);
  }

  addPokedexRegister(trainerId: number, pokemonId: number): Observable<any>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http.post(this.baseUrl + "/profile/pokedexAdd/trainer/" + trainerId + "/pokemon/" + pokemonId, {}, { headers })
    .pipe(
      catchError(this.handleError)
    );
  }

  getUserPokemons(trainerId: number): Observable<number[]> {
    return of([4, 5, 7, 10]);
    //return this.http.get<number[]>(this.baseUrl + '/' + trainerId + '/userPokemons');
  }
}
