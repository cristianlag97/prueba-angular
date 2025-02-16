import { Injectable } from '@angular/core';
import { Pokemon } from '../models/Pokemon';
import { HttpClient } from '@angular/common/http';
import Pokemons from '../models/Pokemons';
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

  private getPokemons(): Observable<any> {
    return this.http.get<{ results: { url: string }[] }>(this.apiUrl, {
      params: { limit: this.limit, offset: this.offset },
    });
  }

  private getPokemonDetails(urls: string[]): Observable<Pokemon[]> {
    const requests = urls.map((url) => this.http.get<Pokemon>(url));
    return forkJoin(requests);
  }

  getPokemonDetail(id: number): Observable<Pokemon> {
    return  this.http.get<Pokemon>(this.apiUrl+id);
  }

  loadMorePokemons(): void {
    if (this.isLoadingSubject.getValue()) return;

    this.isLoadingSubject.next(true);

    this.getPokemons()
      .pipe(
        switchMap((data) => {
          if (!data.results.length) {

            this.isLoadingSubject.next(false);
            return of([]);
          }
          return this.getPokemonDetails(data.results.map((p: any) => p.url));
        }),
        tap((pokemonDetails) => {
          const currentPokemons = this.pokemonsSubject.getValue();
          this.pokemonsSubject.next([...currentPokemons, ...pokemonDetails]);
          this.offset += this.limit;
          this.isLoadingSubject.next(false);
        })
      )
      .subscribe(() => this.isLoadingSubject.next(false));
  }

  filteredPokemons$ = combineLatest([this.pokemons$, this.searchTerm$]).pipe(
    map(([pokemons, searchTerm]) =>
      pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  );

  setSearchTerm(term: string) {
    this.searchTermSubject.next(term);
  }

  clearSearchTerm() {
    this.searchTermSubject.next('');
  }

}
