import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(pokemons: any, input: any): any {
    const searchResult = [];
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
