import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  private apiUrl: string;
  pokemonID: number;
  pokemon: Pokemon;
  previousP: Pokemon;
  nextP: Pokemon;
  obtainedPokemon: Pokemon;

  constructor(private activedRoute: ActivatedRoute, private router: Router, private http: HttpClient) {
    // force route reload when params change
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    //subscribe to the parameters observable
    this.activedRoute.paramMap.subscribe(params => {
      console.log(params.get('id'));
      this.pokemonID = +params.get('id');
    });

    //PONER LAS PETICIONES EN EL SERVICIO!

    // let id = +this.activedRoute.snapshot.paramMap.get('id');
    // this.pokemonID = id;
    this.apiUrl = 'http://localhost:50455/api/pokemon/' + this.pokemonID;
    this.http.get<Pokemon>(this.apiUrl).subscribe(data => {
      console.log(data);
      this.pokemon = data;
    });

    //previous pokemon
    if (this.pokemonID > 1) {
      this.apiUrl = 'http://localhost:50455/api/pokemon/' + (this.pokemonID - 1);
      this.http.get<Pokemon>(this.apiUrl).subscribe(data => {
        console.log(data);
        this.previousP = data;
      });
    }
    //next pokemon
    this.apiUrl = 'http://localhost:50455/api/pokemon/' + (this.pokemonID + 1);
    this.http.get<Pokemon>(this.apiUrl).subscribe(data => {
      console.log(data);
      this.nextP = data;
    });
  }
}
