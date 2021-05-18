import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { UdonShopImplRepository } from './infra/repository/UdonShopRepository/UdonShopImpl.repository';
import { CodeMasterRepository } from './repository/CodeMasterRepository/CodeMaster.repository';
import { CodeMasterImplRepository } from './infra/repository/CodeMasterRepository/CodeMasterImpl.repository';
import { ShopDetailContent } from './presentation/ShopDetailPage/ShopDetailContent/ShopDetailContent.component';
import { ShopDetailPage } from './presentation/ShopDetailPage/ShopDetailPage/ShopDetailPage.component';
import { ShopCard } from './presentation/shared/ShopCard/ShopCard.component';
import { LoadingService } from './service/LoadingService/Loading.service';
import { LoadingInterceptor } from './interceptors/LoadingInterceptor/Loading.interceptor';
import { ShopInfo } from './presentation/shared/ShopInfo/ShopInfo.component';

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
    ShopDetailContent,
    ShopDetailPage,
    ShopInfo,
    ShopCard,
  ],
  imports: [
    BrowserModule,
    OnsenModule,
    AppRoutingModule,
    HttpClientModule,
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
    LoadingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    { provide: UdonShopRepository, useClass: UdonShopImplRepository },
    { provide: CodeMasterRepository, useClass: CodeMasterImplRepository },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
