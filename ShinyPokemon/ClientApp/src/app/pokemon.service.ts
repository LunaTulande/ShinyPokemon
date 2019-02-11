import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from './pokemon';

@Injectable()
export class PokemonService {
  //conection to the "data base" througt the PokemonRepository & PokemonController from server  
  private apiUrl = 'http://localhost:50455/api/pokemon/shinies'; 
  pokemonList: Pokemon[];

  constructor(private http: HttpClient) { }

  getPokemons(): Observable<Pokemon[]> {
    //return the api call only
    return this.http.get<Pokemon[]>(this.apiUrl)
  }
}
