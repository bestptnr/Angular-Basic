import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrl: './action-bar.component.scss'
})
export class ActionBarComponent {
  @Input() step: number = 1
  @Output() valueChange = new EventEmitter()
  @Input() value: number = 0
  @Input() inputDisplay: boolean = true

  increase() {
    if (this.value + this.step < 100) {
      this.value = this.value + this.step
      this.valueChange.emit(this.value)
    }
  }

  decrease() {
    if (this.value - this.step >= 0) {
      this.value = this.value - this.step
      this.valueChange.emit(this.value)

    }
  }
}
