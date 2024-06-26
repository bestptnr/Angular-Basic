import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { OddComponent } from './odd/odd.component';
import { EvenComponent } from './even/even.component';
import { GamecontrolComponent } from './gamecontrol/gamecontrol.component';

@NgModule({
  declarations: [
    AppComponent,
    OddComponent,
    EvenComponent,
    GamecontrolComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
