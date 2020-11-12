import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  message: string;

  private _messageSource = new Subject<string>();
  message$ = this._messageSource.asObservable();

  constructor() { }

  /**
   * Sends message from one component to the other.
   *
   * @param inputMessage
   */
  sendMessage(inputMessage: string) {
    this.message = inputMessage;
    this._messageSource.next(inputMessage);
  }

  getMessage(){
    return this.message;
  }
}
