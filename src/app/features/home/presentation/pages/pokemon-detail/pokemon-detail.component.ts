import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../../infrastructure/models/Pokemon';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../../infrastructure/services/pokemon.service';
import { Constants } from '../../../../../core/constants/Constants';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pokemon-detail',
  imports: [MatCardModule, TranslateModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css'
})
export class PokemonDetailComponent implements OnInit {

  pokemonId: number = 0;
  pokemonDetails: Pokemon | null = null;
  imageUrl: String = '';

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonId = +this.route.snapshot.paramMap.get('id')!;
    this.imageUrl = `${Constants.IMAGE_URL}${this.pokemonId}.png`
    this.pokemonService.getPokemonDetail(this.pokemonId).subscribe({
      next: (data) => {
        this.pokemonDetails = data;
      },
      error: (err) => {
        console.error('Error al obtener detalles del Pokémon:', err);
      }
    });
  }

  get pokemonTypes(): string {
    return this.pokemonDetails?.types.map(type => type.type.name).join(', ') || '';
  }

}
