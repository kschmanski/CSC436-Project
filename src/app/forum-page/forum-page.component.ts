import { Component, OnInit } from '@angular/core';
import { ForumService } from './../forum.service'
import { Subscription } from 'rxjs';
import { Post } from './../forum-post/forum-post.component'

@Component({
  selector: 'app-forum-page',
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.css']
})

export class ForumPageComponent implements OnInit {
  // items: string[] = [];
  items: Post[] = [];
  private sub = new Subscription();


  constructor(private service: ForumService) { }

  ngOnInit(): void {
    this.sub = this.service.getList().subscribe(post => this.items = post);
  }

  public addNewPost(text: string){
    let newPost : Post = new Post(text);
    this.service.add(newPost);
    console.log("New Post!");
  }

  public deletePost(index: number){
    this.service.delete(index);
  }

}
