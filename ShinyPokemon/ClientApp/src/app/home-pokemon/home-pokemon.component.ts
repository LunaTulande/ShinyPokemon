import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-home-pokemon',
  templateUrl: './home-pokemon.component.html',
  styleUrls: ['./home-pokemon.component.css']
})

export class HomePokemonComponent implements OnInit {
  shinyPokemonList: Pokemon[]; //first list
  showList: Pokemon[]; //List to show
  subtitle: string;
  search: string = '';

  constructor(private pokemonService: PokemonService) { }

  getPokemons(): void {
    this.pokemonService.getPokemons().subscribe(data => {
      console.log(data);
      this.shinyPokemonList = data;
      this.showAll();
    })
  }

  showAll(): void {
    this.subtitle = 'All';
    this.showList = this.shinyPokemonList;
  }

  showGeneration(gen: number): void{
    this.subtitle = 'Gen ' + gen;
    this.showList = this.shinyPokemonList.filter(pokemon => pokemon.generation == gen);
  }

  ngOnInit(): void {
    this.getPokemons();
  }

}
