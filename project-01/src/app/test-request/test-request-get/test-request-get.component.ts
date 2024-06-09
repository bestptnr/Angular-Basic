import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Book } from './test-request-get';

@Component({
  selector: 'app-test-request-get',
  templateUrl: './test-request-get.component.html',
  styleUrl: './test-request-get.component.scss'
})
export class TestRequestGetComponent implements OnInit{

  bookList : Book[] = []
  name : string 
  constructor(private http : HttpClient){}

  ngOnInit(): void {
      // this.http.get<Book[]>("https://www.anapioficeandfire.com/api/books")
      // .subscribe(response=>{
      //   this.bookList = response
      // })
  }
  
  onSearchNameBook(){
    // let searchParams = new HttpParams();
    // searchParams = searchParams.append('name', name)
    this.http.get<Book[]>(`https://www.anapioficeandfire.com/api/books?name=${this.name}`)
    .subscribe(response=>{
      console.log(this.name)
      this.bookList = response
    })
  }


}
