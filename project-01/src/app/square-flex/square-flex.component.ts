import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square-flex',
  templateUrl: './square-flex.component.html',
  styleUrl: './square-flex.component.scss'
})
export class SquareFlexComponent {

 @Input() divHeight = 100
 @Input() divWidth = 100
}
