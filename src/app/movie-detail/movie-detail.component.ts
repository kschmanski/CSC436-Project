import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import {NgForm} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {AppComponent} from '../app.component';
import { InteractionService } from '../interaction.service';

export class SQ {
  //the string the user passed in from the search bar
  public sQFromUser: string = '';
}
@NgModule({
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [ AppComponent ]
})

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})

export class MovieDetailComponent implements OnInit {
  title: string;
  awards: string;
  boxOffice: string;
  country: string;
  director: string;
  language: string;
  metascore: string;
  plot: string;
  poster: string;
  production: string;
  rated: string;
  imdbRating: string;
  released: string;
  runtime: string;
  writer: string;
  year: string;
  actors: string;

  getApiStringForMovie(settings, movie_title_to_search : string) {
    return settings.url_without_movie_title + movie_title_to_search + "&plot=full";
  }
  result: any;

  constructor(private http: HttpClient, private _interactionService: InteractionService) { }

  ngOnInit() {
     this.storeMovieTitleFromSearch();
     this.displayMovieResultsFromUserSearch(localStorage.getItem('movie-title'));
  }

  /**
   * Stores the movie title from the user's search query into local storage with the key 'movie-title'
   */
  storeMovieTitleFromSearch() {
    return this._interactionService.message$.subscribe(
      message => {
        localStorage.setItem('movie-title', this._interactionService.getMessage());
      }
    );
  }

  /**
   * Displays the movie results on the Movie Detail page based on the link the user clicked.
   *
   * @param title Title coming from the user's search
   */
  displayMovieResultsFromUserSearch(title): void {
    var apiStringToQuery = this.getApiStringForMovie(api_settings, title);

    // @ts-ignore
    this.http.get<any>(apiStringToQuery, api_settings).subscribe(api_data => {
      this.title = api_data.Title; //
      this.awards = api_data.Awards;//
      this.boxOffice = api_data.BoxOffice;//
      this.country = api_data.Country;
      this.director = api_data.Director; //
      this.language = api_data.Language;
      this.metascore = api_data.Metascore;
      this.plot = api_data.Plot;//
      this.poster = api_data.Poster;//
      this.production = api_data.Production;
      this.rated = api_data.Rated;//
      this.imdbRating = api_data.imdbRating;
      this.released = api_data.Released;//
      this.runtime = api_data.Runtime;//
      this.writer = api_data.Writer;
      this.year = api_data.Year;//
      this.actors = api_data.Actors;//
    })
  }

  onSubmit(f: NgForm): void {
    var apiStringToQuery = this.getApiStringForMovie(api_settings, f.value.sQFromUser);

    // @ts-ignore
    this.http.get<any>(apiStringToQuery, api_settings).subscribe(api_data => {
        this.title = api_data.Title; //
        this.awards = api_data.Awards;//
        this.boxOffice = api_data.BoxOffice;//
        this.country = api_data.Country;
        this.director = api_data.Director; //
        this.language = api_data.Language;
        this.metascore = api_data.Metascore;
        this.plot = api_data.Plot;//
        this.poster = api_data.Poster;//
        this.production = api_data.Production;
        this.rated = api_data.Rated;//
        this.imdbRating = api_data.imdbRating;
        this.released = api_data.Released;//
        this.runtime = api_data.Runtime;//
        this.writer = api_data.Writer;
        this.year = api_data.Year;//
        this.actors = api_data.Actors;//
      });
  }

  addFave(title: string): void{
    //console.log(title);
    localStorage.setItem('fave: ' + title, title);
    this._interactionService.sendMessage(title);
  }
}

var api_key = "430ac435";
var api_title = "good";

var api_settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://www.omdbapi.com/?apikey=" + api_key + "&t=" + api_title + "&plot=full", //not currently used but leaving it here for documentation
  "url_without_movie_title": "http://www.omdbapi.com/?apikey=" + api_key + "&t=",
  "method": "GET",
}

var settings_old = {
  "async": true,
  "crossDomain": true,
  //"url": "https://movie-database-imdb-alternative.p.rapidapi.com/?page=1&r=json&s=Avengers%20Endgame",
  "url": "https://movie-database-imdb-alternative.p.rapidapi.com/?r=json&s=Good%20Will%20Hunting",
  "method": "GET",
  "headers": {
    "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
    "x-rapidapi-key": "195b12d6f0mshe52a785c6bbf16bp196bfbjsn7b9cebbaeae6"
  }
}
