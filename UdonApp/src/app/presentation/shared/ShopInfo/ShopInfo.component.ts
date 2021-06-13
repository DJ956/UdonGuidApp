import { Component, EventEmitter, Injectable, Input, OnInit, Output } from "@angular/core";
import * as ons from "onsenui";
import { Observable } from "rxjs";
import { CommonApplicationMessage } from "src/app/consts/CommonApplicationMessage";
import { CodeMasterRequestModel } from "src/app/model/request/CodeMasterRequest.model";
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

    holidays: CodeMasterModel[];

    @Output()
    clickShopNameEvent: EventEmitter<void> = new EventEmitter<void>();

    private holidayObserver: Observable<CodeMasterModel[]>;

    displayHolidayText: string;

    constructor(private codeMasterService: CodeMasterService) {
        this.holidayObserver = this.codeMasterService.$holidayObserver;
        this.holidayObserver.subscribe(hs => {
            this.holidays = hs;

        });
    }

    ngOnInit() {
        this.displayHolidayText = "";
        this.shop.holidays.split('').forEach(h => {
            let idx: number = this.holidays.findIndex(model => h === model.code);
            if (idx > -1) {
                this.displayHolidayText += " " + this.holidays[idx].codeDesc;
            }
        });
    }

    /** 店舗名をクリックした際のイベント*/
    onClickShopName() {
        this.clickShopNameEvent.emit();
    }

}