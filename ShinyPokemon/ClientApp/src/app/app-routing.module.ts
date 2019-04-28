import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePokemonComponent } from './home-pokemon/home-pokemon.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { RegistrationFormComponent } from './account/registration-form/registration-form.component';
import { LoginFormComponent } from './account/login-form/login-form.component';
import { FacebookLoginComponent } from './account/facebook-login/facebook-login.component';
import { AuthHomeComponent } from './dashboard/auth-home/auth-home.component';
import { AuthGuard } from './utils/auth.guard';

const appRoutes: Routes = [
  { path: '', component: HomePokemonComponent, pathMatch: 'full' },
  { path: 'pokemon-detail/:id', component: PokemonDetailComponent },
]
const accountRoutes: Routes = [
  { path: 'register', component: RegistrationFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'facebook-login', component: FacebookLoginComponent },
]
// const dashboardRoutes: Routes = [
//   { path: 'dashboard/authHome', component: AuthHomeComponent, canActivate: [AuthGuard] },
// ]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
    RouterModule.forChild(accountRoutes)
    // RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
