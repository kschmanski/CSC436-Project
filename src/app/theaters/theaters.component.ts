import { Component, OnInit } from '@angular/core';
import {GoogleMapsModule} from "@angular/google-maps";
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import {AppComponent} from "../app.component";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [AppComponent],  imports: [BrowserModule, GoogleMapsModule],
  providers: [],
  bootstrap: [AppComponent],
})

@Component({
  selector: 'app-theaters',
  templateUrl: './theaters.component.html',
  styleUrls: ['./theaters.component.css']
})
export class TheatersComponent implements OnInit {
  lat = 41.8781; //Chicago Latitude
  lng = -87.6298; //Chicago Longitude
  constructor() { }

  ngOnInit() {
  }

}
