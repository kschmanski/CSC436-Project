import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Post } from '../forum-page/forum-page.component';
import { ForumService } from '../forum.service';
import { Subscription } from 'rxjs';

export class Comment {
  username : string;
  commentText : string;
  createdDate : Date;

  constructor(comment : string){
    this.username = "username";
    this.commentText = comment;
    this.createdDate = new Date();
  }
};

@Component({
  selector: 'app-forum-post',
  templateUrl: './forum-post.component.html',
  styleUrls: ['./forum-post.component.css']
})
export class ForumPostComponent implements OnInit {
  forumPost : Post;
  private sub = new Subscription();
  // @Output() newPostEvent = new EventEmitter<number>();

  constructor(private service: ForumService) { }

  ngOnInit():void {
    this.sub = this.service.getPost().subscribe(post => this.forumPost = post);
    // console.log(this.forumPost);
  }

  public addNewComment(comment : string){
    let newcomm : Comment = new Comment(comment);
    this.forumPost.comments.push(newcomm);
    this.forumPost.commentsNum++;
  }

  public newComment;


  public addToList() {
    this.newComment.emit(this.newComment);
    this.newComment = "";
  }

}
