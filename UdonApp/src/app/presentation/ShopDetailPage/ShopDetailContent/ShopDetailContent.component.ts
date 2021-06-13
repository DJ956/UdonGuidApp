import { Component, Injectable, OnInit } from "@angular/core";
import { UdonShopModel } from "src/app/model/resource/UdonShop.model";
import { UdonShopService } from "src/app/service/UdonShopService/UdonShop.service";

/**
 * 店舗情報の詳細を表示する
 */
@Component({
    selector: 'app-ShopDetailContent',
    templateUrl: './ShopDetailContent.component.html',
    styleUrls: ['./ShopDetailContent.component.css']
})
@Injectable({
    providedIn: 'root'
})
export class ShopDetailContent implements OnInit {

    constructor(private udonShopService: UdonShopService) {
        this.udonShop = this.udonShopService.selectedUdonShop;
        this.isLogined = true;
    }

    /**true:ログイン済み, false:ログインしていない */
    isLogined: boolean;

    /**表示させる店舗情報 */
    udonShop: UdonShopModel;

    ngOnInit() {
    }

    /**
     * 店舗に対してコメントを追加する
     */
    onClickAddComment() {

    }

}