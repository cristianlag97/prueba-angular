import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { SigninPageComponent } from './features/auth/presentation/pages/signin-page/signin-page.component';
import { NotFoundComponent } from './shared/presentation/components/not-found/not-found.component';
import { MainComponent } from './layouts/main/main.component';
import { authGuard } from './features/auth/infrastructure/guards/auth.guard';
import { PokemonsComponent } from './features/home/presentation/pages/pokemons/pokemons.component';
import { PokemonDetailComponent } from './features/home/presentation/pages/pokemon-detail/pokemon-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      { path: 'pokemons', component: PokemonsComponent, title: "Pokemon's" },
      { path: 'pokemons/:id', component: PokemonDetailComponent },
      { path: '', redirectTo: '/pokemons', pathMatch: 'full' },
    ],
  },

  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'sign-in', component: SigninPageComponent, title: 'Login' },
    ],
  },

  { path: '**', component: NotFoundComponent },
];
