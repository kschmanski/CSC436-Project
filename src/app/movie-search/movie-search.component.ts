import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { NgModule } from '@angular/core';
import {NgForm} from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {AppComponent} from "../app.component";
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

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  model = new SearchQuery();

  onSubmit(f: NgForm): void {

    console.log(f.value.searchQueryFromUser);
    
    // @ts-ignore
    this.http.get<any>(settings2.url, settings2).subscribe(data => {
      console.log(data);
    })

  }



}

var api_key = "430ac435";
var api_title = "good";

var settings2 = {
  "async": true,
  "crossDomain": true,
  "url": "http://www.omdbapi.com/?apikey=" + api_key + "&t=" + api_title + "&plot=full",
  "method": "GET",
}

var settings = {
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


