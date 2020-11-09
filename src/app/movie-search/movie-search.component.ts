import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { NgModule } from '@angular/core';
import {NgForm} from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {AppComponent} from "../app.component";
import { InteractionService } from '../interaction.service';


export class SearchQuery {
  //the string the user passed in from the search bar
  public searchQueryFromUser: string = '';

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
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})


export class MovieSearchComponent implements OnInit {
  

  /**
   * Returns the API query string to call, based on the movie query string supplied by the user.
   *
   * @param settings
   * @param movie_title_to_search
   */
  getApiStringForMovie(settings, movie_title_to_search : string) {
    return settings.url_without_movie_title + movie_title_to_search + "&plot=full";
  }
 

  constructor(private http: HttpClient, private _interactionService: InteractionService) { }

  result: any;
  message: string;

  /*ngOnInit() {
    this.message = this._interactionService.getMessage();
    console.log("hello world");
    console.log(this.message);
  }*/
  msg: any;;
  ngOnInit() {
    this.msg = this._interactionService.getMessage;
    console.log(this._interactionService.getMessage);
  }

  model = new SearchQuery();

  onSubmit(f: NgForm): void {
    var apiStringToQuery = this.getApiStringForMovie(api_settings, f.value.searchQueryFromUser);

    // @ts-ignore
    this.http.get<any>(apiStringToQuery, api_settings).subscribe(api_data => {
        console.log(api_data);
        console.log(api_data[0]);
        this.result = api_data.Search;
      })
  }
}

var api_key = "430ac435";
var api_title = "good";

var api_settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://www.omdbapi.com/?apikey=" + api_key + "&s=" + api_title + "&plot=full", //not currently used but leaving it here for documentation
  "url_without_movie_title": "http://www.omdbapi.com/?apikey=" + api_key + "&s=",
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


