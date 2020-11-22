import { InteractionService } from '../interaction.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {AppComponent} from '../app.component';
import {SearchQuery} from '../movie-search/movie-search.component';
import {ForumService} from '../forum/forum.service';
import {Post} from '../forum/forum-page/forum-page.component'

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
  model = new SQ();
  suggestions = [];
  forumPost : Post[];
  titles: Array<string> = [ 'Inception',
                            'Happy Gilmore',
                            'The Terminator',
                            'The Lord of the Rings: The Fellowship of the Ring',
                            'Harry Potter and the Sorcerer\'s Stone'
                          ];

  group_members: Array<string> = [
    'Afia Ekra',
    'Michael Guzman',
    'Edward Lin',
    'Kaz Schmanski',
    'Afrim Zenuni'
  ];

  constructor(private http: HttpClient, private _interactionService: InteractionService, private _forumService : ForumService) { 
    this.forumPost = _forumService.getFivePost();
  }

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

  /**
   * Sends Message from home component to other components.
   * At this time, only the movie-search component will use this.
   */
  sendMessageFromHomeComponent() {
      console.log('Sending message: ' + (document.getElementById('sQFromUser') as HTMLInputElement).value);
      this._interactionService.sendMessage((document.getElementById('sQFromUser') as HTMLInputElement).value);
      this._interactionService.sendMessage
  }

  onSubmit(f: NgForm): void {
    //var apiStringToQuery = this.getApiStringForMovie(api_settings, f.value.sQFromUser);
    localStorage.setItem('movie-title', f.value.sQFromUser);
    this._interactionService.sendMessage(f.value.sQFromUser);
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
