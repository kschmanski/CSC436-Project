import { InteractionService } from "../interaction.service";
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { NgModule } from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {AppComponent} from "../app.component";
import {SearchQuery} from "../movie-search/movie-search.component";


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
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  public sQFromUser: string = '';
  model = new SQ();

  constructor(private _interactionService: InteractionService) { }

  ngOnInit() {
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

}
