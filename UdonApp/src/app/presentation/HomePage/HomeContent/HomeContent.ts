import { Component, Injectable } from '@angular/core';

import * as ons from 'onsenui';
import { RandomPage } from '../../RandomPage/RandomPage/RandomPage';
import { FilterPage } from '../FilterPage/FilterPage/FilterPage';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-HomeContent',
  templateUrl: './HomeContent.html',
  styleUrls: ['./HomeContent.css'],
})
export class HomeContent {
  public random = RandomPage;
  public filter = FilterPage

  constructor() { }
}
