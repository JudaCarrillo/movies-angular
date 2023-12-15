import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-card-movie',
  standalone: true,
  imports: [],
  templateUrl: './card-movie.component.html',
  styleUrl: './card-movie.component.css',
})
export class CardMovieComponent {
  @Input({ required: true }) movie!: Movie;

  public getImage(): string {
    return this.movie.Poster === 'N/A'
      ? 'https://via.placeholder.com/600'
      : this.movie.Poster;
  }
}
