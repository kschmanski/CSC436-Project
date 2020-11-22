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
    this.posts.splice(index,1);
  }

  getPostList(): Observable<Post[]> {
    // which one of these is right?
    return of(this.posts);
    // return this.posts;
  }

  // returns first 5 posts or all posts if less than 5
  getFivePost(): Post[] {
    if(this.posts.length <= 5){
      return this.posts;
    }
    return this.posts.slice(0,5);
  }

  setPost(post){
    post.views++;
    this.currentPost = post;
  }

  getPostIndex(post: Post): number{
    return this.posts.indexOf(post);
  }

  getPost(): Observable<Post> {
    return of(this.currentPost);
  }
}
