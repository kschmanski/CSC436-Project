import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {AppComponent} from "../app.component";

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
  onSubmit(form): void {
    console.log(form.value);
    this.http.get<any>('https://movie-database-imdb-alternative.p.rapidapi.com/?page=1&r=json&s=Avengers%20Endgame', settings).subscribe(data => {
      console.log(data);
    });
  }



}

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://movie-database-imdb-alternative.p.rapidapi.com/?page=1&r=json&s=Avengers%20Endgame",
  "method": "GET",
  "headers": {
    "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
    "x-rapidapi-key": "195b12d6f0mshe52a785c6bbf16bp196bfbjsn7b9cebbaeae6"
  }
}


