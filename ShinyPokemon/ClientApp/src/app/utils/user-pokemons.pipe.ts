import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';

@Pipe({
  name: 'userPokemons'
})
export class UserPokemonsPipe implements PipeTransform {

  transform(pokemons: Pokemon[], [showUserPokemons, idPokemons, logged]:[boolean, number[], boolean]): Pokemon[] {
    const userPokemons: Pokemon[] = [];
    var pokemon;
    if (showUserPokemons && logged) {
      if (idPokemons) {
        for (const id of idPokemons.sort((n1,n2) => n1 - n2)) {
          pokemon = pokemons.find(pokemon => pokemon.idpokemon == id);
          if (pokemon) {
            userPokemons.push(pokemon);
          }
        }
      }
      return userPokemons;
    }else{
      return pokemons;
    }
    
  }
}
