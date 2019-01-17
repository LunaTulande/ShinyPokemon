import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-home-pokemon',
  templateUrl: './home-pokemon.component.html',
  styleUrls: ['./home-pokemon.component.css']
})

export class HomePokemonComponent implements OnInit {
  private apiUrl = 'http://localhost:50455/api/pokemon/shinies'; // filtro de solo shinies desde servidor: PokemonRepository y PokemonController
  shinyPokemonList: Pokemon[]; //first list
  //showShiny: boolean = true;
  showList: Pokemon[]; //List to show

  constructor(private http: HttpClient) {
    this.http.get<Pokemon[]>(this.apiUrl).subscribe(data => {
      console.log(data);
      this.shinyPokemonList = data;
      this.showAll();
    });
  }

  showAll(): void {
    this.showList = this.shinyPokemonList;
  }

  showGeneration(gen: number): void{
    this.showList = this.shinyPokemonList.filter(pokemon => pokemon.generation == gen);
  }

  ngOnInit(): void {
  }

}
