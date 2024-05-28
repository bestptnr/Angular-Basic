import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-gamecontrol',
  templateUrl: './gamecontrol.component.html',
  styleUrl: './gamecontrol.component.css'
})
export class GamecontrolComponent {

  @Output() timerfired = new EventEmitter<number>();
  timer;
  number=0;

  onStartGame(){
    this.timer = setInterval(()=>{
        this.timerfired.emit(this.number+1)
        this.number++
    },1000)
  }

  onStopGame(){
    clearInterval(this.timer)
  }
}
