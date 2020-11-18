import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from './forum-page/forum-page.component'


@Injectable({
  providedIn: 'root'
})
export class ForumService {

  posts : Post[] = [];
  currentPost : Post;

  constructor() { }

  addPost(post){
    this.posts.push(post);
  }

  deletePost(index: number){
    // do I want to delete posts?
  }

  getPostList(): Observable<Post[]> {
    // which one of these is right?
    return of(this.posts);
    // return this.posts;
  }

  setPost(post){
    this.currentPost = post;
  }

  getPost(): Observable<Post> {
    return of(this.currentPost);
  }
}
