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

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonService.getPokemons().subscribe(data => {
      console.log(data);
      this.shinyPokemonList = data;
      this.showAll();
    })
  }

  setWhatToShow(eventValue) {
    this.showList = eventValue.showList;
    this.subtitle = eventValue.subtitle;
    //this.search = eventValue.search;
  }

  showAll(): void {
    this.subtitle = 'All';
    this.showList = this.shinyPokemonList;
  }

}
