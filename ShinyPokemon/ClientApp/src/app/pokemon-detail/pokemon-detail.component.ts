import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  pokemonID: number;
  pokemon: Pokemon;
  private apiUrl: string;

  constructor(private _route: ActivatedRoute, private http: HttpClient) { 
    let id = +this._route.snapshot.paramMap.get('id');
    this.pokemonID = id;
    this.apiUrl = 'http://localhost:50455/api/pokemon/'+this.pokemonID;

    this.http.get<Pokemon>(this.apiUrl).subscribe(data => {
      console.log(data);
      this.pokemon = data;
    });
  }

  ngOnInit() {
  }

}
