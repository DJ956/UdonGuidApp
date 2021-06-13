import { Component, Input, OnInit } from "@angular/core";
import { UdonShopModel } from "src/app/model/resource/UdonShop.model";
import { UdonShopService } from "src/app/service/UdonShopService/UdonShop.service";


@Component({
    selector: 'app-ShopCard',
    templateUrl: './ShopCard.component.html',
    styleUrls: ['./ShopCard.component.css']
})
export class ShopCard implements OnInit {
    /**
     * UdonShopのデータを設定する
     */
    @Input()
    shop: UdonShopModel

    constructor(private udonShopService: UdonShopService) {
    }

    ngOnInit() {
    }

}