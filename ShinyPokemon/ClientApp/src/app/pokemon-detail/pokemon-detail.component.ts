import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  pokemonId: number;
  pokemon: Pokemon;
  previousP: Pokemon;
  nextP: Pokemon;
  evolutionLine: Pokemon[][];
  loading: boolean;

  constructor(private activedRoute: ActivatedRoute, private router: Router, private pokemonService: PokemonService) {
    // force route reload when params change
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    //subscribe to the parameters observable
    this.activedRoute.paramMap.subscribe(params => {
      console.log(params.get('id'));
      this.pokemonId = +params.get('id');
    });

    //current pokemon
    this.getCurrentPokemon();

    //previous pokemon
    if (this.pokemonId > 1) {
      this.getPrevious();
    }

    //next pokemon
    this.getNext();

    //evolutionLine
    this.getEvolutionLine();
  }//ngOnInit

  getCurrentPokemon(): void {
    this.loading = true;
    this.pokemonService.getPokemon(this.pokemonId).subscribe(data => {
      console.log(data);
      this.loading = false;
      this.pokemon = data;
    })
  }
  getPrevious(): void {
    this.pokemonService.getPreviousShiny(this.pokemonId).subscribe(data => {
      console.log(data);
      this.previousP = data;
    })
  }

  getNext(): void {
    this.pokemonService.getNextShiny(this.pokemonId).subscribe(data => {
      console.log(data);
      this.nextP = data;
    })
  }

  getEvolutionLine(): void {
    this.loading = true;
    this.pokemonService.getEvolutionLine(this.pokemonId).subscribe(data => {
      console.log(data);
      this.loading = false;
      this.evolutionLine = data;
      console.log(this.evolutionLine);
    })
  }
}
