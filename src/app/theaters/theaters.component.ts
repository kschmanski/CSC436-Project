import { Component, OnInit } from '@angular/core';
import {GoogleMapsModule} from "@angular/google-maps";
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import {AppComponent} from "../app.component";

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
  lat = 51.678418;
  lng = 7.809007;
  constructor() { }

  result: any;
  center: google.maps.LatLngLiteral

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }

}

var google_api_settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://www.google.com/maps/@?api=1&map_action=map",
  "method": "GET",
  "key": "AIzaSyAC9PRQfTqQD6F5BdlbzFRF2wnuf_WdkTM"
}
