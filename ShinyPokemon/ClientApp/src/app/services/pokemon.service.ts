import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon';

@Injectable()
export class PokemonService {
  //conection to the "data base" througt the PokemonRepository & PokemonController from server  
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) { }

  getPokemons(): Observable<Pokemon[]> {
    //return the api call only
    return this.http.get<Pokemon[]>(this.apiUrl + '/shinies')
  }

  getPokemon(id: number): Observable<Pokemon> {
    //return the api call only
    return this.http.get<Pokemon>(this.apiUrl + '/' + id)
  }

  getPreviousShiny(id: number): Observable<Pokemon> {
    //return the api call only
    return this.http.get<Pokemon>(this.apiUrl + '/' + id + '/previousShiny')
  }

  getNextShiny(id: number): Observable<Pokemon> {
    //return the api call only
    return this.http.get<Pokemon>(this.apiUrl + '/' + id + '/nextShiny')
  }

  getEvolutionLine(id: number): Observable<Pokemon[][]> {
    //return the api call only
    return this.http.get<Pokemon[][]>(this.apiUrl + '/' + id + '/evolutionLine')
  }
}
