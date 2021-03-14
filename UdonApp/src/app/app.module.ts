import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeContent,
    HomePage,
    RandomPage,
    RandomContent,
  ],
  imports: [
    BrowserModule,
    OnsenModule,
    AppRoutingModule,    
  ],
  entryComponents:[
    RandomPage,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  providers: [
    {provide:UdonShopRepository, useClass:MockUdonShopRepository},
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
