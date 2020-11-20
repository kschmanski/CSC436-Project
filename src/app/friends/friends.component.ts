import { Component, OnInit } from '@angular/core';
import { FriendsService } from './friends.service';
import { Subscription } from 'rxjs';
import { InteractionService } from '../interaction.service';
@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})

export class FriendsComponent implements OnInit {
  friendList: Friends[] = [];
  private sub = new Subscription();

  constructor(private service: FriendsService, private _interactionService: InteractionService) {   }

  ngOnInit() {
    this.sub = this.service.getFriendList().subscribe(friend => this.friendList = friend);
  }

  public addNewFriend(email: string, nickName: string) {
    let friend: Friends = new Friends (email, nickName);
    this.service.addFriend(friend);
    // console.log("New Post!");
  }
  public deleteFriend(friend: Friends) {
    this.service.deleteFriend(this.service.getIndex(friend));
  }
  redirectToDetail(movieTitle) {
    localStorage.setItem('movie-title', movieTitle);
    this._interactionService.sendMessage(movieTitle);
  }
}

export class Friends {
  email: string;
  nickName: string;


  constructor(email: string, nickName: string) {
    this.email = email;
    this.nickName = nickName;
  }
}
