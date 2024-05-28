import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "../models/post.model";
import { catchError, map, Subject, tap, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  error = new Subject<string>()

  constructor(private http: HttpClient) { }

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title, content }
    this.http.post<{ name: string }>(
      'https://ng-complete-guide-b0ab1-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json', postData, {
      observe: "response"
    })
      .subscribe((responseData) => {
        console.log(responseData)
      }, error => {
        this.error.next(error.message)
      })
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty')
    return this.http.get('https://ng-complete-guide-b0ab1-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json', {
      headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
      params: searchParams,
      responseType: 'json'
    })
      .pipe(map((response: { [key: string]: Post }) => {
        const postsArray: Post[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            postsArray.push({ ...response[key], id: key })

          }
        }
        return postsArray
      }), catchError(errRes => {
        return throwError(errRes)
      }))
  }

  deletePosts() {
    return this.http.delete('https://ng-complete-guide-b0ab1-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json', {
      observe: 'events',
      responseType: 'text'
    }).pipe(tap(event => {
      console.log(event)
      if (event.type === HttpEventType.Response) {
        console.log(event.body)
      }
    }))
  }
}