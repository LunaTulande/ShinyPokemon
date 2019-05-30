import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';

@Pipe({
  name: 'generation'
})
export class GenerationPipe implements PipeTransform {
  
  transform(pokemons: Pokemon[], gen: number): Pokemon[] {
    var genPokemon: Pokemon[] = [];
    if (gen == 0) {
      genPokemon = pokemons;
    } else {
      genPokemon = pokemons.filter(pokemon => pokemon.generation == gen);      
    }
    return genPokemon; 
  }

}
