import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-max-min-meter',
  templateUrl: './max-min-meter.component.html',
  styleUrl: './max-min-meter.component.scss'
})
export class MaxMinMeterComponent {

  @Input() minLabel = "minLabel"
  @Input() maxLabel = "maxLabel"

  @Output() minChange = new EventEmitter()
  @Output() maxChange = new EventEmitter()

  doMinChange(value : number){
    this.minChange.emit(value)
  }

  doMaxChange(value : number){
    this.maxChange.emit(value)

  }


}
