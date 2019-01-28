import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.css']
})
export class HomeMenuComponent implements OnInit {
  @Input() shinyPokemonList: Pokemon[]; //first list
  @Output() whatToShow: EventEmitter<{showList: Pokemon[], subtitle: string}> = new EventEmitter();
  showList: Pokemon[]; //List to show
  subtitle: string;
  search: string = '';

  constructor() { }
  ngOnInit() { }

  onChange(){
    this.whatToShow.emit({showList: this.showList, subtitle: this.subtitle});
  }

  showAll(): void {
    this.subtitle = 'All';
    this.showList = this.shinyPokemonList;
  }

  showGeneration(gen: number): void{
    this.subtitle = 'Gen ' + gen;
    this.showList = this.shinyPokemonList.filter(pokemon => pokemon.generation == gen);
  }
}
