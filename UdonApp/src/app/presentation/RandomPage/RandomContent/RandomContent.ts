import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as ons from 'onsenui';
import { Observable } from 'rxjs';
import { CommonApplicationMessage } from 'src/app/consts/CommonApplicationMessage';
import { CodeMasterRequestModel } from 'src/app/model/request/CodeMasterRequest.model';
import { UdonShopRequestModel } from 'src/app/model/request/UdonShopRequest.model';
import { UserLogInRequestModel } from 'src/app/model/request/Auth/UserLogInRequest.model';
import { CodeMasterModel } from 'src/app/model/resource/CodeMaster.model';
import { UdonShopModel } from 'src/app/model/resource/UdonShop.model';
import { AuthService } from 'src/app/service/AuthService/Auth.service';
import { CodeMasterService } from 'src/app/service/CodeMasterService/CodeMaster.service';
import { UdonShopService } from 'src/app/service/UdonShopService/UdonShop.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-RandomContent',
  templateUrl: './RandomContent.html',
  styleUrls: ['./RandomContent.css', '../../../app.component.css']
})
export class RandomContent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private codeMasterService: CodeMasterService,
    private udonShopService: UdonShopService) {
    //購買設定
    this.udonShopObserver = this.udonShopService.$udonShopObserver;
    this.udonShopObserver.subscribe(udonShops => {
      this.$udonShops = udonShops;
    });
  }

  public $udonShops: UdonShopModel[];
  public $holidays: CodeMasterModel[];

  public udonShopObserver: Observable<UdonShopModel[]>;

  async ngOnInit() {
    this.$udonShops = [];
    this.$holidays = [];

    //店舗取得
    try {
      let resuqest: UdonShopRequestModel = { userId: 1 };
      await this.udonShopService.fetchUdonShops(resuqest);
    } catch (e) {
      ons.notification.alert({ title: CommonApplicationMessage.ERROR_TITLE, messageHTML: e });
    }

    try {
      let request: CodeMasterRequestModel = {
        userId: 1,
        CategoryCd: CodeMasterService.HOLIDAY
      };
      await this.codeMasterService.getCodeMasters(request);
      console.log("fetch");
    } catch (e) {
      ons.notification.alert({ title: CommonApplicationMessage.ERROR_TITLE, messageHTML: e });
    }

    // ログイン
    const req: UserLogInRequestModel = {
      userName: 'Admin',
      password: 'pass'
    };
    try {
      await this.authService.logIn(req);
    } catch (e) {
      ons.notification.alert({ title: CommonApplicationMessage.ERROR_TITLE, messageHTML: e });
    }

  }

  /**
   * 店舗情報のカードを表示する
   * UdonShopServiceに選択済み店舗情報を設定する。
   * @param shop 
   */
  onClickMove2ShopCard(shop: UdonShopModel) {
    this.udonShopService.selectedUdonShop = shop;
    this.router.navigate(['/shopDetail']);
  }

}
