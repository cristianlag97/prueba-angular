import { Component, inject, OnInit } from '@angular/core';
import { Constants } from '../../../../../core/constants/Constants';
import { PokemonService } from '../../../infrastructure/services/pokemon.service';
import { Router } from '@angular/router';
import { BehaviorSubject, debounceTime, distinctUntilChanged, forkJoin, Observable } from 'rxjs';
import { Pokemon } from '../../../infrastructure/models/Pokemon';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pokemons',
  imports: [
    PokemonCardComponent,
    MatCardModule,
    CommonModule,
    LoadingComponent,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './pokemons.component.html',
  styleUrl: './pokemons.component.css',
})
export class PokemonsComponent implements OnInit {
  pokemonService = inject(PokemonService);

  imageUrl: string = Constants.IMAGE_URL;

  searchControl = new FormControl('');
  isSearching$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    this.onSearch();
  }

  ngOnInit(): void {
    this.pokemonService.loadMorePokemons();
  }

  // Detecta el scroll y carga más Pokémon
  onScroll() {
    const threshold = 50;
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition + threshold >= documentHeight) {
      this.pokemonService.loadMorePokemons();
    }
  }

  // Redirige a la vista de detalles de un Pokémon
  onCardClick(pokemonId: number) {
    this.router.navigate(['/pokemons/', pokemonId]);
  }

  // Escucha los cambios en el campo de búsqueda
  onSearch() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => {
        const trimmedTerm = term?.trim() || '';
        this.isSearching$.next(!!trimmedTerm);

        if (trimmedTerm) {
          this.pokemonService.setSearchTerm(trimmedTerm);
        } else {
          this.pokemonService.clearSearchTerm();
        }
      });
  }
}
