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
  subtitle: string = 'All';
  search: string = '';
  loading: boolean;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.loading = true;
    this.pokemonService.getPokemons().subscribe(data => {
      console.log(data);
      this.loading = false;
      this.shinyPokemonList = data;
      this.showList = this.shinyPokemonList;
    })
  }

  setWhatToShow(eventValue): void {
    this.showList = eventValue.showList;
    this.subtitle = eventValue.subtitle;
  }

}
