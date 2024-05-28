import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './models/post.model';
import { PostService } from './services/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  loadedPosts: Post[] = [];
  isLoading: boolean = false
  error = null
  private errorSub:Subscription
  constructor(private http: HttpClient, private postService: PostService) { }

  ngOnInit() {
    this.errorSub = this.postService.error.subscribe(errMesage=>{
      this.error = errMesage
    })
    this.isLoading = true
    this.postService.fetchPosts().subscribe((posts) => {
      this.isLoading = false
      this.loadedPosts = posts
    },error=>{
      this.error  = error.message
    })
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.postService.createAndStorePost(postData.title, postData.content)
  }

  onFetchPosts() {
    this.isLoading = true
    this.postService.fetchPosts().subscribe((posts) => {
      this.isLoading = false
      this.loadedPosts = posts
    },error=>{
      this.isLoading = false
      this.error  = error.message
    })
  }

  onClearPosts() {
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    })
  }

  ngOnDestroy(): void {
      this.errorSub.unsubscribe()
  }

  onHandleError(){
    this.error = null
  }
}
