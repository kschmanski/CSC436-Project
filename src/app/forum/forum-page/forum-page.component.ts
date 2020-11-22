import { Component, OnInit } from '@angular/core';
import { ForumService } from './../forum.service'
import { Subscription } from 'rxjs';
import { Comment } from './../forum-post/forum-post.component'

export class Post {
  username : string;
  title : string;
  content : string;
  views : number;
  comments : Comment[];
  commentsNum : number;
  createdDate : Date;


  constructor(title : string, body : string){
    this.username = "username";
    this.title = title;
    this.content = body;
    this.views = 0;
    this.comments = [];
    this.commentsNum = this.comments.length;
    this.createdDate = new Date();
  }
};

@Component({
  selector: 'app-forum-page',
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.css']
})

export class ForumPageComponent implements OnInit {
  items: Post[] = [];
  private sub = new Subscription();


  constructor(private service: ForumService) { }

  ngOnInit(): void {
    this.sub = this.service.getPostList().subscribe(post => this.items = post);
  }

  public addNewPost(title: string, body: string){
    let newPost : Post = new Post(title, body);
    this.service.addPost(newPost);
    // console.log("New Post!");
  }

  public deletePost(index: number){
    this.service.deletePost(index);
  }

  public sendPost(post : Post){
    // post.views++;
    this.service.setPost(post);
  }

}
