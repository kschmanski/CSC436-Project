import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ForumService {

  posts = [];

  constructor() { }

  add(post){
    this.posts.push(post);
  }

  delete(index: number){
    // do I want to delete posts?
  }

  getList(): Observable<string[]> {
    // which one of these is right?
    return of(this.posts);
    // return this.posts;
  }
}
