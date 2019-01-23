import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { HomePokemonComponent } from './home-pokemon/home-pokemon.component';
import { HomeMenuComponent } from './home-menu/home-menu.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { SearchPipe } from './search.pipe';
import { PokemonService } from './pokemon.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    CounterComponent,
    FetchDataComponent,
    HomePokemonComponent,
    HomeMenuComponent,
    PokemonDetailComponent,
    ScrollTopComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomePokemonComponent, pathMatch: 'full' },
      // { path: 'counter', component: CounterComponent },
      // { path: 'fetch-data', component: FetchDataComponent },
      { path: 'pokemon-detail/:id', component: PokemonDetailComponent },
    ])
  ],
  providers: [PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
