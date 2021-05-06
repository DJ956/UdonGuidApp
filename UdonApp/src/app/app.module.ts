import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { OnsenModule } from 'ngx-onsenui';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeContent } from './presentation/HomePage/HomeContent/HomeContent';
import { HomePage } from './presentation/HomePage/HomePage/HomePage';
import { RandomPage } from './presentation/RandomPage/RandomPage/RandomPage';
import { RandomContent } from './presentation/RandomPage/RandomContent/RandomContent';
import { UdonShopRepository } from './repository/UdonShopRepository/UdonShop.repository';
import { MockUdonShopRepository } from './infra/repository/UdonShopRepository/MockUdonShop.repository';
import { FilterContent } from './presentation/HomePage/FilterPage/FilterContent/FilterContent';
import { FilterPage } from './presentation/HomePage/FilterPage/FilterPage/FilterPage';
import { SearchPage } from './presentation/SearchPage/SearchPage/SearchPage';
import { SearchContent } from './presentation/SearchPage/SearchContent/SearchContent';

@NgModule({
  declarations: [
    AppComponent,
    HomeContent,
    HomePage,
    RandomPage,
    RandomContent,
    FilterContent,
    FilterPage,
    SearchPage,
    SearchContent,
  ],
  imports: [
    BrowserModule,
    OnsenModule,
    AppRoutingModule,
    HttpClient,
  ],
  entryComponents: [
    RandomPage,
    FilterPage,
    SearchPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  providers: [
    { provide: UdonShopRepository, useClass: MockUdonShopRepository },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
