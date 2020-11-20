import { Friends } from './friends.component';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FriendsService {
  friend: Friends[] = [];

  constructor() { }

  addFriend(friend) {
    this.friend.push(friend);
  }

  deleteFriend(index: number) {
    this.friend.splice(index, 1);
  }

  getFriendList(): Observable<Friends[]> {
    return of(this.friend);
  }
  getIndex(friend: Friends): number {
    return this.friend.indexOf(friend);
  }

}
