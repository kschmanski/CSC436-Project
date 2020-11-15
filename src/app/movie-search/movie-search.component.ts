import { HttpClient } from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import { map } from 'rxjs/operators';
import { NgModule } from '@angular/core';
import {NgForm, FormGroup, FormControl, Validators} from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {AppComponent} from "../app.component";
import { InteractionService } from '../interaction.service';

export class SearchQuery {
  //the string the user passed in from the search bar
  public searchQueryFromUser: string = '';
  public message: string = '';

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

  constructor(private http: HttpClient, private _interactionService: InteractionService

  ) {
  }

  name = new FormControl('');
  name2 = new NgForm(null, null);

  result: any;
  msg: any;

  ngOnInit() {
    // this._interactionService.message$.subscribe(
    //   message => {
    //       this.msg = this._interactionService.getMessage();
    //       console.log('Movie Search Component received Message: ' + this._interactionService.getMessage());
    //       console.log('this.msg is now ' + this.msg);
    //       this.myFunction(this.msg);
    //   }
    // )
  }

  myFunction(message : string) {
    console.log('myFunction: ' + message);

    this.name.setValue(message);
    //this.name2.controls['message'].setValue(message);
    //this.name2.setValue(message);
    this.name2.controls.state.setValue(message);

    console.log('calling API');
    var apiStringToQuery = this.getApiStringForMovie(api_settings, message);
    console.log(apiStringToQuery);

    // @ts-ignore
    this.http.get<any>(apiStringToQuery, api_settings).subscribe(api_data => {
      console.log(api_data);
      console.log(api_data[0]);
      this.result = api_data.Search;
    })
  }

  model = new SearchQuery();

  onSubmit(f: NgForm): void {

    var apiStringToQuery = this.getApiStringForMovie(api_settings, f.value.searchQueryFromUser);
    //var apiStringToQuery = this.getApiStringForMovie(api_settings, this.name.value);

    // @ts-ignore
    this.http.get<any>(apiStringToQuery, api_settings).subscribe(api_data => {
        //console.log(api_data);
        //console.log(api_data[0]);
        this.result = api_data.Search;
      })

  }

  redirectFromSearchToDetail(movieTitle) {

    //console.log('redirect from search to detail');

    console.log('title is: ');
    console.log(movieTitle);

    console.log('calling setCookie');
    //this.setCookie(movieObject);
    localStorage.setItem('movie-title', movieTitle);

    console.log(localStorage.getItem('movie-title'));

    //document.cookie="movie-name='" + title + "';";

    //console.log(document.cookie);
    this._interactionService.sendMessage(movieTitle);

  }

  setCookie(title) {
    console.log('setting cookie');
    var d = new Date();

    d.setTime(d.getTime() + 100);
    var expires = "expires="+ d.toUTCString();
    document.cookie = "movie-name" + "=" + title + ";" + expires + ";path=/";

    console.log('all finished setting cookie');
    console.log('cookie is ' + document.cookie);
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


