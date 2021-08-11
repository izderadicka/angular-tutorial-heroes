import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import {version, fullInfo} from '../environments/version'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  constructor() {
    console.log(`Running HEROESDEMO v ${version} (production: ${environment.production})`);

    if (! environment.production) {
      console.log(fullInfo());
    }
  }
}
