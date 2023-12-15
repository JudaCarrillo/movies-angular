import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { CardMovieComponent } from '../card-movie/card-movie.component';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import {
  Observable,
  Subscription,
  debounceTime,
  distinct,
  filter,
  fromEvent,
  map,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, CardMovieComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  private _movieService = inject(MovieService);
  @ViewChild('movieSearchInput', { static: true })
  movieSearchInput!: ElementRef;
  movieSubscription!: Subscription;

  movies$!: Observable<Movie[]>;

  /* public getMoviesByTitle(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;

    this._movieService.getMoviesByTitle(searchTerm).subscribe((movies) => {
      console.log(this.moviesList);
      this.moviesList = movies !== undefined ? movies : [];
      console.log(this.moviesList);
    });
  } */

  /* public getMoviesByTitle(searchTerm: string) {
    this._movieService.getMoviesByTitle(searchTerm).subscribe((movies) => {
      console.log(this.moviesList);
      this.moviesList = movies !== undefined ? movies : [];
      console.log(this.moviesList);
    });
  } */

  ngOnInit(): void {
    this.movies$ = fromEvent<Event>(
      this.movieSearchInput.nativeElement,
      'keyup'
    ).pipe(
      map((event: Event) => (event.target as HTMLInputElement).value),
      debounceTime(500),
      distinct(),
      filter((searchTerm: string) => searchTerm.length >= 3),
      switchMap((searchTerm: string) =>
        this._movieService.getMoviesByTitle(searchTerm)
      )
    );
  }
}
