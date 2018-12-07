import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../pokemon';


@Component({
  selector: 'app-home-pokemon',
  templateUrl: './home-pokemon.component.html',
  styleUrls: ['./home-pokemon.component.css']
})
export class HomePokemonComponent implements OnInit {
  private apiUrl = 'http://localhost:51545/api/pokemon/shinies';
  shinyPokemonList: Pokemon[];

  constructor(private http: HttpClient) {
    this.http.get<Pokemon[]>(this.apiUrl).subscribe(data => {
      console.log(data);
      this.shinyPokemonList = data;
    });
  }

  ngOnInit(): void {
  }

}
