import { Component, OnInit, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgForm} from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { InteractionService } from '../interaction.service';
import {AppComponent} from '../app.component';

export class Card {
  public title: string;
  public year: string;
  public poster: string;
  public actors: string;
  public director: string;
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
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})

export class FavoritesComponent implements OnInit {
  public Cards = [];
  temp = new Card();
  constructor(private http: HttpClient, private _interactionService: InteractionService) {   }

  ngOnInit(): void {
    this.addToFaves(this._interactionService.getMessage());
    //this.addToFaves('The Dark Knight');
    //this.addToFaves('Good Will Hunting');
    //this.addToFaves('Bajirao Mastani');
  }

  getApiStringForMovie(settings, movie_title_to_search : string) {
    return settings.url_without_movie_title + movie_title_to_search + "&plot=full";
  }

  public addToFaves(title: string){
    this.temp = new Card();
    var apiStringToQuery = this.getApiStringForMovie(api_settings, title);
        // @ts-ignore
    this.http.get<any>(apiStringToQuery, api_settings).subscribe(api_data => {
          console.log(api_data);
          this.temp.title = api_data.Title; //
          this.temp.poster = api_data.Poster; //
          this.temp.year = api_data.Year; //
          this.temp.actors = api_data.Actors; //
          this.temp.director = api_data.Director;//
        });

    this.Cards.push(this.temp);
    console.log(this.Cards);
  }

  public removeCards(index){
    this.Cards.splice(index, 1);

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