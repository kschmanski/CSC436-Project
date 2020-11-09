import { InteractionService } from './../interaction.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { NgModule } from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {AppComponent} from "../app.component";


export class SQ {
  //the string the user passed in from the search bar
  //public sQFromUser: string = '';
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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  public sQFromUser: string = '';

  constructor(private http: HttpClient, private _interactionService: InteractionService) { }
  movie_name = '';
  movie_plot = '';
  movie_year = '';
  movie_director = '';
  movie_actors = '';

  model = new SQ();
  message: any;
  



  /**
   * Returns the API query string to call, based on the movie query string supplied by the user.
   *
   * @param settings
   * @param movie_title_to_search
   */
  getApiStringForMovie(settings, movie_title_to_search : string) {
    return settings.url_without_movie_title + movie_title_to_search + "&plot=full";
  }

  ngOnInit() {
  }

  sendM(){
    this._interactionService.setMessage(this.sQFromUser);
    alert(this.sQFromUser);
  }

  /*
  sendM(){
    console.log("from console " + this.model.sQFromUser);
    this._interactionService.sendMessage(this.model.sQFromUser);
  }*/

  onSubmit(f: NgForm): void {
    var apiStringToQuery = this.getApiStringForMovie(api_settings, f.value.sQFromUser);

    // @ts-ignore
    this.http.get<any>(apiStringToQuery, api_settings).subscribe(api_data => {
        console.log(api_data);
        console.log(api_data.Actors);

        this.movie_name = api_data.Title;
        this.movie_plot = api_data.Plot;
        this.movie_year = api_data.Years;
        this.movie_director = api_data.Director;
        this.movie_actors = api_data.Actors;
      })
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
