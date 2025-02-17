import { Injectable } from '@angular/core';
import { Pokemon } from '../models/Pokemon';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  private limit = 50;
  private offset = 0;

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  private pokemonsSubject = new BehaviorSubject<Pokemon[]>([]);
  pokemons$ = this.pokemonsSubject.asObservable();

  private searchTermSubject = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSubject.asObservable();

  constructor(private http: HttpClient) {}

   // Obtiene la lista de Pokémon con sus URLs
  private getPokemons(): Observable<{ results: { url: string }[] }> {
    return this.http.get<{ results: { url: string }[] }>(this.apiUrl, {
      params: { limit: this.limit, offset: this.offset },
    });
  }

  // Obtiene los detalles de los Pokémon dados sus URLs
  private getPokemonDetails(urls: string[]): Observable<Pokemon[]> {
    return urls.length ? forkJoin(urls.map(url => this.http.get<Pokemon>(url))) : of([]);
  }

  //Obtiene los detalles de un solo Pokémon por ID
  getPokemonDetail(id: number): Observable<Pokemon> {
    return  this.http.get<Pokemon>(`${this.apiUrl}${id}`);
  }

  //Carga más Pokémon y actualiza el estado
  loadMorePokemons(): void {
    if (this.isLoadingSubject.getValue()) return;

    this.isLoadingSubject.next(true);

    this.getPokemons()
      .pipe(
        switchMap(({ results }) => this.getPokemonDetails(results.map(p => p.url))),
        tap((pokemonDetails) => {
          this.pokemonsSubject.next([...this.pokemonsSubject.getValue(), ...pokemonDetails]);
          this.offset += this.limit;
        })
      )
      .subscribe({
        complete: () => this.isLoadingSubject.next(false),
        error: () => this.isLoadingSubject.next(false),
      });
  }

  //Filtra Pokémon en base al término de búsqueda
  filteredPokemons$ = combineLatest([this.pokemons$, this.searchTerm$]).pipe(
    map(([pokemons, searchTerm]) =>
      pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  );

  // Establece el término de búsqueda
  setSearchTerm(term: string) {
    this.searchTermSubject.next(term);
  }

  // Limpia el término de búsqueda
  clearSearchTerm() {
    this.searchTermSubject.next('');
  }

}
