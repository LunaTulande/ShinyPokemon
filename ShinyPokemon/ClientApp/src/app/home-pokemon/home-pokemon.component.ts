import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';
import { PokemonService } from '../services/pokemon.service';
import { LoginService } from '../services/login.service';
import { ProfileService } from '../services/profile.service';
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
  isLogged: boolean;
  userDetails: AuthHome;
  userPokemons: number[];

  constructor(private pokemonService: PokemonService,
    private loginService: LoginService, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getPokemons();
    this.subscription = this.getLoginSubscription();
  }

  getLoginSubscription(): Subscription {
    return this.loginService.authNavStatus$.subscribe(
      (status) => {
      this.isLogged = status;
        if (this.isLogged) {
          this.getProfile();
        }
      });
  }

  getProfile(): void {
    this.profileService.getUserDetails().subscribe(
      (homeDetails: AuthHome) => { this.userDetails = homeDetails; }
    );
    this.profileService.getUserPokemons().subscribe(
      (userPokemons: number[]) => { this.userPokemons = userPokemons; }
    );
  }

  ngOnDestroy(): void {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }

  pokemonRegistered(id: number): boolean {
    var pokemonRegistered = false;
    for(let pokemonId of this.userPokemons){
      if (pokemonId == id) {
        pokemonRegistered = true;
      }
    }
    return pokemonRegistered;
  }

  getPokemons(): void {
    this.loading = true;
    this.pokemonService.getPokemons().subscribe(data => {
      console.log(data);
      this.loading = false;
      this.shinyPokemonList = data;
      this.showList = this.shinyPokemonList;
    });
  }

  setListToShow(eventValue): void {
    this.showList = eventValue.showList;
    this.subtitle = eventValue.subtitle;
  }

}
