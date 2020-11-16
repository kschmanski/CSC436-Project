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

  constructor(private http: HttpClient, private _interactionService: InteractionService) {  }

  ngOnInit(): void {
    for (let i = 0; i < localStorage.length; i++){
      let key = localStorage.key(i);
      if(key.includes('title: ')) {
        let value = localStorage.getItem(key);
        this.addToFaves(value);
      }
    }
  }

  public removeCards(index) {
    localStorage.removeItem('title: ' + this.Cards[index].title);
    this.Cards.splice(index, 1);
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
    localStorage.setItem('movie-title', movieTitle);
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