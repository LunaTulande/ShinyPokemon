import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, XHRBackend } from '@angular/http';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomePokemonComponent } from './home-pokemon/home-pokemon.component';
import { HomeMenuComponent } from './home-menu/home-menu.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { SearchPipe } from './utils/search.pipe';
import { PokemonService } from './services/pokemon.service';
import { RegistrationFormComponent } from './account/registration-form/registration-form.component';
import { LoginFormComponent } from './account/login-form/login-form.component';
import { LoginService } from './services/login.service';
import { AuthHomeComponent } from './profile/auth-home/auth-home.component';
import { AuthGuard } from './utils/auth.guard';
import { ConfigService } from './services/config.service';
import { EmailValidator } from './utils/email-validator.directive';
import { FacebookLoginComponent } from './account/facebook-login/facebook-login.component';
import { ProfileService } from './services/profile.service';
import { AuthenticateXHRBackend } from './utils/authenticate-xhr.backend';
import { AppRoutingModule } from './app-routing.module';
import { UserPokemonsPipe } from './utils/user-pokemons.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomePokemonComponent,
    HomeMenuComponent,
    PokemonDetailComponent,
    ScrollTopComponent,
    SearchPipe,
    RegistrationFormComponent,
    LoginFormComponent,
    FacebookLoginComponent,
    AuthHomeComponent,
    EmailValidator,
    UserPokemonsPipe,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [PokemonService, LoginService, ProfileService, AuthGuard, ConfigService, {
    provide: XHRBackend,
    useClass: AuthenticateXHRBackend
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
