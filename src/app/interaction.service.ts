import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  //private _messageSource = new Subject<string>();
  message: string;
  //message$ = this._messageSource.asObservable();

  constructor() { }

  setMessage(str: string){
    console.log("set message: ");
    console.log(str);
    this.message = str;
  }

  getMessage(){
    return this.message;
  }

  //sendMessage(message: string) {
    //this._messageSource.next(message);
  //}

}
