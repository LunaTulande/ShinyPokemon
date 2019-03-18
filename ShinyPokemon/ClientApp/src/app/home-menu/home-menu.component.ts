import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.css']
})
export class HomeMenuComponent implements OnInit {
  @Input() shinyPokemonList: Pokemon[]; //first list
  @Output() whatToShow: EventEmitter<{ showList: Pokemon[], subtitle: string }> = new EventEmitter();
  showList: Pokemon[]; //List to show
  subtitle: string;
  generations: number[] = [1, 2, 3, 4];
  selectedGen: number;

  constructor() { }
  ngOnInit(): void { }

  onSelected(gen: number): void {
    if (this.selectedGen == gen) {
      this.selectedGen = 0;
    } else {
      this.selectedGen = gen;
    }
  }

  showGeneration(gen: number): void {
    if (this.selectedGen == gen) {
      this.subtitle = 'All';
      this.showList = this.shinyPokemonList;
    } else {
      this.subtitle = 'Gen ' + gen;
      this.showList = this.shinyPokemonList.filter(pokemon => pokemon.generation == gen);
    }
    this.whatToShow.emit({ showList: this.showList, subtitle: this.subtitle });
  }
  
}
