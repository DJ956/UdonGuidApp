import { Component, Injectable, OnInit } from '@angular/core';

import * as ons from 'onsenui';
import { CommonApplicationMessage } from 'src/app/consts/CommonApplicationMessage';
import { UdonShopRequestModel } from 'src/app/model/request/UdonShopRequest.model';
import { UdonShopModel } from 'src/app/model/resource/UdonShop.model';
import { UdonShopService } from 'src/app/service/UdonShopService/UdonShop.service';

@Injectable({
  providedIn:'root'
})
@Component({
  selector: 'app-RandomContent',
  templateUrl: './RandomContent.html',
  styleUrls: ['./RandomContent.css']
})
export class RandomContent implements OnInit {

  constructor(
    private udonShopService:UdonShopService){}

    public $udonShops:UdonShopModel[];

    async ngOnInit(){
      this.$udonShops = [];

      try{
        let resuqest:UdonShopRequestModel = {
          UserId:''
        };
        this.$udonShops = (await this.udonShopService.fetchUdonShops(resuqest)).UdonShops;        
        //今の時間で行っている店舗でフィルターをかける
        let toDay = new Date();
        //this.$udonShops = this.udonShopService.filterBetweenTime(toDay.getHours(), toDay.getMinutes());
        this.$udonShops = this.udonShopService.filterBetweenTime(this.$udonShops, 15, 0);
        console.log(this.$udonShops);
      }catch(e){
        ons.notification.alert({title:CommonApplicationMessage.ERROR_TITLE, messageHTML:`${e}`});
      }
    }

    getHolidaysText(shop:UdonShopModel) : String{
      let txt : String = "";
      shop.Holidays.forEach(h =>{
        txt += h.Name + " ";
      });

      return txt;
    }




}
