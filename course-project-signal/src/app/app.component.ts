import { Component } from '@angular/core';

import { DefaultComponent } from './default/default.component';
import { SingalComponent } from './signal/signal.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [DefaultComponent,SingalComponent]
})
export class AppComponent {}
