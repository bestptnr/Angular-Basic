import { NgFor } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-signal',
  templateUrl: './signal.component.html',
  standalone: true,
  imports: [NgFor],
})
export class SingalComponent {
  actions = signal<string[]>([]);
  counter = signal<number>(0);
  doubleCounter = computed(()=>this.counter() * 2)

  constructor(){
    effect(()=>console.log(this.counter()))
  }
  increment() {
    // this.counter.update((oldValue) => oldValue + 1);
    this.counter.set(this.counter()+1)
    this.actions.update((oldValue)=>[...oldValue,"INCREMENT"])
    // this.actions.push('INCREMENT');
  }

  decrement() {
    this.counter.update((oldValue) => oldValue - 1);
    this.actions.update((oldValue)=>[...oldValue,"DECREMENT"])

  }
}
