import { Component, Injectable } from '@angular/core';

import * as ons from 'onsenui';

@Injectable({
  providedIn:'root'
})
@Component({
  selector: 'app-HomeContent',
  templateUrl: './HomeContent.html',
  styleUrls: ['./HomeContent.css']
})
export class HomeContent {
  title = 'UdonApp';

  constructor(){}
}
