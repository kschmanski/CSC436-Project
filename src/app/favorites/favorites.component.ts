import { Component, OnInit, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  public Cards: Card[] = [];

  constructor(private http: HttpClient, private _interactionService: InteractionService) {
    /**this._interactionService.message$.subscribe(value => {
       this.addToFaves(value);
    });
    */

    }

  ngOnInit(): void { 
    this._interactionService.message$.subscribe(value => {
      var temp = value;
      localStorage.setItem('title: ' + value, value)
      this.addToFaves(value);
   });

    for (let i = 1; i < localStorage.length; i++){
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    this.addToFaves(value);
  }

   this.addToFaves(this._interactionService.getMessage());
   /**
    * this line does take in messages from the search page but
    * it only keepts the most recent favorited movie and doesn't
    * add additional movies to the Cards array
   //this.addToFaves(this._interactionService.getMessage());
    */


     //this.addToFaves('Good Will Hunting');
    //console.log(this.Cards);
    //this.addToFaves('The Dark Knight');
    //console.log(this.Cards);

    /** 
    this._interactionService.message$.subscribe(
      message => {
          this.msg = this._interactionService.getMessage();
          console.log('Movie Search Component received Message: ' + this._interactionService.getMessage());
          console.log('this.msg is now ' + this.msg);
          this.addToFaves(this.msg);
      }
    )
  */
    //this.addToFaves(this._interactionService.getMessage());
    //this.addToFaves('The Dark Knight');
    //this.addToFaves('Good Will Hunting');
    //this.addToFaves('Bajirao Mastani');
  }

  public removeCards(index){
    this.Cards.splice(index, 1);
    if (this.Cards.length < 1) { localStorage.clear; }
    else { localStorage.removeItem(localStorage.key(index)); }
  }

  public addToFaves(title: string) {
    let card = new Card();
    var apiStringToQuery = this.getApiStringForMovie(api_settings, title);
        // @ts-ignore
    this.http.get<any>(apiStringToQuery, api_settings).subscribe(api_data => {
          console.log(api_data);
          card.title = api_data.Title;
          card.poster = api_data.Poster;
          card.year = api_data.Year;
          card.actors = api_data.Actors;
          card.director = api_data.Director;
        });
    this.Cards.push(card);
    console.log(this.Cards);
  }

  private getApiStringForMovie(settings, movie_title_to_search : string) {
    return settings.url_without_movie_title + movie_title_to_search + "&plot=full";
  }

  redirectToDetail(movieTitle) {

    this._interactionService.sendMessage(movieTitle);
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