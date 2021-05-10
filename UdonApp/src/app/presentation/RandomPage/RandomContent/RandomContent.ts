import { Component, Injectable, OnInit } from '@angular/core';

import * as ons from 'onsenui';
import { Observable } from 'rxjs';
import { CommonApplicationMessage } from 'src/app/consts/CommonApplicationMessage';
import { CodeMasterRequestModel } from 'src/app/model/request/CodeMasterRequest.model';
import { UdonShopRequestModel } from 'src/app/model/request/UdonShopRequest.model';
import { CodeMasterModel } from 'src/app/model/resource/CodeMaster.model';
import { UdonShopModel } from 'src/app/model/resource/UdonShop.model';
import { CodeMasterService } from 'src/app/service/CodeMasterService/CodeMaster.service';
import { UdonShopService } from 'src/app/service/UdonShopService/UdonShop.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-RandomContent',
  templateUrl: './RandomContent.html',
  styleUrls: ['./RandomContent.css']
})
export class RandomContent implements OnInit {

  constructor(
    private codeMasterService: CodeMasterService,
    private udonShopService: UdonShopService) { }

  public $udonShops: UdonShopModel[];
  public $holidays: CodeMasterModel[];

  public udonShopObserver: Observable<UdonShopModel[]>;

  async ngOnInit() {
    this.$udonShops = [];
    this.$holidays = [];

    //購買設定
    this.udonShopObserver = this.udonShopService.$udonShopObserver;
    this.udonShopObserver.subscribe(udonShops => {
      this.$udonShops = udonShops;
    });

    //店舗取得
    try {
      let resuqest: UdonShopRequestModel = { UserId: '' };
      await this.udonShopService.fetchUdonShops(resuqest);
      //今の時間で行っている店舗でフィルターをかける
      let toDay = new Date();
      this.udonShopService.filterBetweenTime(toDay.getHours(), toDay.getMinutes());
    } catch (e) {
      ons.notification.alert({ title: CommonApplicationMessage.ERROR_TITLE, messageHTML: e });
    }

    try {
      let request: CodeMasterRequestModel = {
        UserId: '',
        CategoryCd: CodeMasterService.HOLIDAY
      };

      this.$holidays = await (await this.codeMasterService.getCodeMasters(request)).codeMasters;
    } catch (e) {
      ons.notification.alert({ title: CommonApplicationMessage.ERROR_TITLE, messageHTML: e });
    }
  }

  /**コードマスタから休日のテキストを取得し、返す */
  getHolidaysText(shop: UdonShopModel): String {
    let txt: String = "";

    shop.holidays.split('').forEach(h => {
      let idx: number = this.$holidays.findIndex(model => h === model.code);
      if (idx > -1) {
        txt += " " + this.$holidays[idx].codeDesc;
      }
    });
    return txt;
  }




}
