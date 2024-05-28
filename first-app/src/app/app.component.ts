import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
    h4 {
      color: blue;
    }
  `]
})
export class AppComponent {
  name = 'best';
}
