import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from './forum-post/forum-post.component'


@Injectable({
  providedIn: 'root'
})
export class ForumService {

  posts : Post[] = [];

  constructor() { }

  add(post){
    this.posts.push(post);
    console.log(this.posts.length);
    console.log(this.posts);
  }

  delete(index: number){
    // do I want to delete posts?
  }

  getList(): Observable<Post[]> {
    // which one of these is right?
    return of(this.posts);
    // return this.posts;
  }
}
