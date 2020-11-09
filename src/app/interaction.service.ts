import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  //private _messageSource = new Subject<string>();
  message: string;
  //message$ = this._messageSource.asObservable();

  constructor() { }

  setMessage(str: string){
    this.message = str;
  }

  getMessage(){
    console.log("get message: ");
    return this.message;
  }
}
