import { Component, Injectable, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { UdonShopModel } from 'src/app/model/resource/UdonShop.model';
import { UdonShopService } from 'src/app/service/UdonShopService/UdonShop.service';

@Injectable({
    providedIn: "root"
})
@Component({
    selector: "app-FilterContent",
    templateUrl: "./FilterContent.html",
    styleUrls: ["./FilterContent.css"]
})
export class FilterContent implements OnInit {

    private udonShopsObserver: Observable<UdonShopModel[]>;

    constructor(private udonShopService: UdonShopService) {
        this.udonShopService.within5km = true;
        this.udonShopService.within10km = false;
        this.udonShopService.notHoliday = true;
        this.udonShopService.businessCondition = true;
        this.udonShopsObserver = this.udonShopService.$udonShopObserver;
    }

    ngOnInit(): void {

    }

    /**
     * 現在時刻が午後かどうか
     * @returns 
     */
    private isPM(): boolean { return new Date().getHours() > 12 }

    onChangeWithin5km(checked: boolean) { this.udonShopService.within5km = checked; }

    onChangeWithin10km(checked: boolean) { this.udonShopService.within10km = checked; }

    //onChangeAMCondition(checked: boolean) { this.udonShopService.amCondition = checked; }

    onChangePMCondition(checked: boolean) { this.udonShopService.pmCondition = checked; }

    onChangeBusinnessCondition(checked: boolean) { this.udonShopService.businessCondition = checked; }

    onChangeNotHoliday(checked: boolean) { this.udonShopService.notHoliday = checked; }

}