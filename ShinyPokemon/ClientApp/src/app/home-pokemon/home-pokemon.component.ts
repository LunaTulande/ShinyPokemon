import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';
import { PokemonService } from '../services/pokemon.service';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthHome } from '../interfaces/auth-home';

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

  subscription: Subscription;
  status: boolean;
  homeDetails: AuthHome;
  fun: string = "";

  constructor(private pokemonService: PokemonService, private userService: UserService) { }

  ngOnInit(): void {
    this.getPokemons();
    this.subscription = this.userService.authNavStatus$.subscribe(
      (status) => { this.status = status; this.fun = "hola"; });  
    
  }

  getHomeDetails() {
    this.userService.getHomeDetails().subscribe(
      (homeDetails: AuthHome) => { this.homeDetails = homeDetails });
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
