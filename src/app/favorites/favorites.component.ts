import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})

/** 
class Cards {
  public title: string;
  public movieDetailPageLink: string;
  public actorA: string;
  public actorB: string;
  public actorC: string;
  public actorD: string;
  public actorAPageLink: string;
  public actorBPageLink: string;
  public actorCPageLink: string;
  public actorDPageLink: string;
  public movieIMGsrc: string;
  public isFavorite: boolean;
}
*/

export class FavoritesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public cards = [];

  public addToFaves(){

  }

  public removeCards(index){
    this.cards.splice(index, 1)
  } 
}
