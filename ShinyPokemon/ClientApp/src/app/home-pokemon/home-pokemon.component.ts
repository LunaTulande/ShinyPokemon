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
  shinyPokemonList: Pokemon[]; 
  subtitle: string = '';

  search: string = '';
  loading: boolean;
  subscription: Subscription;
  isLogged: boolean;
  userDetails: AuthHome;
  userIdPokemons: number[] = [];
  showUserPokemons: boolean = false;

  selectedGen: number = 0;
  generations: number[] = [1, 2, 3, 4];

  constructor(private pokemonService: PokemonService,
    private loginService: LoginService, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getPokemons();
    this.subscription = this.getLoginSubscription();
  }

  getPokemons(): void {
    this.loading = true;
    this.pokemonService.getPokemons().subscribe(data => {
      this.loading = false;
      this.shinyPokemonList = data;
    });
  }

  setGen(gen:number):void{
    if (this.selectedGen == gen) {
      this.selectedGen = 0;
      this.subtitle = '';
    } else {
      this.selectedGen = gen;
      this.subtitle = 'Gen ' + gen;
    }
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
      (homeDetails: AuthHome) => {
        this.userDetails = homeDetails;
        this.profileService.getPokedex(this.userDetails.id).subscribe(
          (userIdPokemons: number[]) => { this.userIdPokemons = userIdPokemons; }
        );
      }
    );
  }

  ngOnDestroy(): void {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }

  addPokedexRegister(pokemonId: number) {
    this.profileService.addPokedexRegister(this.userDetails.id, pokemonId).subscribe(
      () => { this.userIdPokemons.push(pokemonId) }
    );
  }

  isPokemonRegistered(id: number): boolean {
    var idFind = this.userIdPokemons.find(x => x == id);
    if (idFind) {
      return true;
    } else {
      return false;
    }
  }

  removePokedexRegister(pokemonId: number) {
    this.profileService.removePokedexRegister(this.userDetails.id, pokemonId)
      .subscribe(
        (index: number) => {
          index = this.userIdPokemons.indexOf(pokemonId, 0);
          if (index > -1) {
            this.userIdPokemons.splice(index, 1);
          }
        }
      );
  }

}
