import { InteractionService } from '../interaction.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {AppComponent} from '../app.component';
import {SearchQuery} from '../movie-search/movie-search.component';

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

class Movie {
  title: string;
  year: string;
  director: string;
  actors: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  public sQFromUser: string = '';
  suggestions = [];
  titles: Array<string> = ['Spanglish',
                            'Train to Busan',
                            '3 Idiots',
                            'Harry Potter and the Sorcerer\'s Stone',
                            'Home Alone'
                          ];

  constructor(private http: HttpClient, private _interactionService: InteractionService) { }

  ngOnInit() {
    for (let i=0; i < this.titles.length; i++){
      this.suggest(this.titles[i]);
    }
  }

  suggest(title: string): void {
    let movie = new Movie();
    var apiStringToQuery = this.getApiStringForMovie(api_settings, title);
        // @ts-ignore
    this.http.get<any>(apiStringToQuery, api_settings).subscribe(api_data => {
          console.log(api_data);
          movie.title = api_data.Title;
          movie.year = api_data.Year;
          movie.actors = api_data.Actors;
          movie.director = api_data.Director;
        });
    this.suggestions.push(movie);
    console.log(this.suggestions);
  }

  private getApiStringForMovie(settings, movie_title_to_search : string) {
    return settings.url_without_movie_title + movie_title_to_search + "&plot=full";
  }

  redirectToDetail(movieTitle) {
    localStorage.setItem('movie-title', movieTitle);
    this._interactionService.sendMessage(movieTitle);
    console.log(movieTitle);
    console.log('in home ' + localStorage.getItem('movie-title'));
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