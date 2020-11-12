import { Component, OnInit } from '@angular/core';
import { ForumService } from './../forum.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forum-page',
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.css']
})
export class ForumPageComponent implements OnInit {
  items: string[] = [];
  private sub = new Subscription();


  constructor(private service: ForumService) { }

  ngOnInit(): void {
    this.sub = this.service.getList().subscribe(post => this.items = post);
  }

  public addNewPost(newPost: string){
    this.service.add(newPost);
  }

  public deletePost(index: number){
    this.service.delete(index);
  }

}
