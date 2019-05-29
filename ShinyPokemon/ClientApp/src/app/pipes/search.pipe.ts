import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(pokemons: Pokemon[], input: string): Pokemon[] {
    const searchResult: Pokemon[] = [];
    if (pokemons) {
      for (const pokemon of pokemons) {
        if (pokemon.name.toLowerCase().indexOf(input.toLowerCase()) > -1) {
          searchResult.push(pokemon);
        };
      };
    }
    return searchResult;
  }
}
