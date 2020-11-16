import { Component, EventEmitter, OnInit, Output } from '@angular/core';

let counter: number = 0;

export class Post {
  username : string;
  title : string;
  content : string;
  views : number;
  comments : number;
  createdDate : Date;


  constructor(title : string, body : string){
    this.username = "username";
    this.title = title;
    this.content = body;
    this.views = 0;
    this.comments = 55;
    this.createdDate = new Date();
  }
};

@Component({
  selector: 'app-forum-post',
  templateUrl: './forum-post.component.html',
  styleUrls: ['./forum-post.component.css']
})
export class ForumPostComponent implements OnInit {
  usernname : string;
  title : string;
  content : string;
  views : number;
  comments : number;
  createdDate : Date;

  @Output() newPostEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit():void {
  }

  public newPost;


  public addToList() {
    this.newPost.emit(this.newPost);
    this.newPost = "";
  }

}
