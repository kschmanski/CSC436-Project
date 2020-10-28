import { Component, OnInit } from '@angular/core';
import {Config} from "../config";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})

export class ConfigComponent implements OnInit {
  private configService: any;

  constructor() { }

  ngOnInit() {
  }
  config: Config;

  showConfig() {
    this.configService.getConfig()
      // clone the data object, using its known Config shape
      .subscribe((data: Config) => this.config = { ...data });
  }


}
