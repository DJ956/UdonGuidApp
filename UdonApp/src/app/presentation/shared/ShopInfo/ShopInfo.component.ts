import { Component, EventEmitter, Injectable, Input, OnInit, Output } from "@angular/core";
import * as ons from "onsenui";
import { CodeMasterModel } from "src/app/model/resource/CodeMaster.model";
import { UdonShopModel } from "src/app/model/resource/UdonShop.model";
import { CodeMasterService } from "src/app/service/CodeMasterService/CodeMaster.service";

@Component({
    selector: 'app-ShopInfoComponent',
    templateUrl: './ShopInfo.component.html',
    styleUrls: ['./ShopInfo.component.css']
})
@Injectable({
    providedIn: 'root'
})
export class ShopInfo implements OnInit {

    @Input()
    shop: UdonShopModel;

    @Output()
    clickShopNameEvent: EventEmitter<void> = new EventEmitter<void>();

    public $holidays: CodeMasterModel[];

    constructor(private codeMasterService: CodeMasterService) {
    }

    async ngOnInit() {
        try {
            this.$holidays = this.codeMasterService.Holidays;
        } catch (e) {
            ons.notification.alert({ title: 'エラー', messageHTML: e });
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

    /** 店舗名をクリックした際のイベント*/
    onClickShopName() {
        this.clickShopNameEvent.emit();
    }

}