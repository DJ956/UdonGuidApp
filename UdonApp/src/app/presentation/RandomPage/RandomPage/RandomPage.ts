import { Component, Injectable } from '@angular/core';

import * as ons from 'onsenui';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'ons-page[app-RandomPage]',
  templateUrl: './RandomPage.html',
  styleUrls: ['./RandomPage.scss']
})
export class RandomPage {
  constructor() { }
}
