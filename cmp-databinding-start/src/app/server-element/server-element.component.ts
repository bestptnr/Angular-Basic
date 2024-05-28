import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ContentChild, DoCheck, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrl: './server-element.component.css',
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class ServerElementComponent implements 
  OnChanges, 
  OnInit, 
  DoCheck, 
  AfterContentInit,
  AfterContentChecked, 
  AfterViewInit,
  AfterViewChecked,
  OnDestroy 
  {

  @Input('srvElement') element: {
    name: string,
    content: string,
    type: string
  };

  @ViewChild('heading',{static:true}) header : ElementRef
  @ContentChild('contentParagraph',{static:true}) paragraph : ElementRef

  @Input() name: string;
  constructor() {
    console.log("Constructor called")
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges called", changes)
  }

  ngOnInit(): void {
    console.log("ngOnInit called")
    console.log("Text content :"+this.header.nativeElement.textContent)
    console.log("Text content of paragraph :"+this.paragraph.nativeElement.textContent)

  }

  ngDoCheck(): void {
    console.log("ngDoCheck called!")
  }

  ngAfterContentInit(): void {
    console.log("ngAfterContentInit Called!")
  }

  ngAfterContentChecked(): void {
    console.log("ngAfterContentChecked Called!")

  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit Called!")
    console.log("Text content :"+this.header.nativeElement.textContent)
    console.log("Text content of paragraph :"+this.paragraph.nativeElement.textContent)


  }
  ngAfterViewChecked(): void {
    console.log("ngAfterViewChecked Called!")

  }
  ngOnDestroy(): void {
    console.log("ngOnDestroy Called!")
  }

}
