import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { CommonApplicationMessage } from "src/app/consts/CommonApplicationMessage";
import { UdonShopRequestModel } from "src/app/model/request/UdonShopRequest.model";
import { CodeMasterModel } from "src/app/model/resource/CodeMaster.model";
import { UdonShopModel } from "src/app/model/resource/UdonShop.model";
import { UdonShopResponseModel } from "src/app/model/response/UdonShopResponse.model";
import { UdonShopRepository } from "src/app/repository/UdonShopRepository/UdonShop.repository";
import { FilterCondition } from "src/app/utils/FilterCondition";
import { ShopTime } from "src/app/utils/ShopTime";
import { CodeMasterService } from "../CodeMasterService/CodeMaster.service";


@Injectable({
    providedIn: 'root'
})
export class UdonShopService {

    /**リストのオリジナル */
    private $udonShopOriginList: UdonShopModel[];
    /**フィルター用のリスト */
    private $filteredUdonShopList: UdonShopModel[];
    /**リストのサブジェクト この変数のnextが実行されて時、オブサーバで購買している値が変更される。 */
    private $uodonShopSubject: BehaviorSubject<UdonShopModel[]>;
    /**UdonShopのオブサーバ */
    public $udonShopObserver: Observable<UdonShopModel[]>;

    /**選択済み店舗情報 */
    public selectedUdonShop: UdonShopModel;

    constructor(private udonShopRepository: UdonShopRepository) {
        this.$udonShopOriginList = [];
        this.$filteredUdonShopList = [];
        this.$uodonShopSubject = new BehaviorSubject<UdonShopModel[]>([]);
        this.$udonShopObserver = this.$uodonShopSubject.asObservable();
    }



    /**5km圏内に店がある */
    private _within5km: boolean = false;
    public get within5km(): boolean { return this._within5km; }
    /** */
    public set within5km(value: boolean) {
        this._within5km = value;
    }


    /**10km圏内に店がある */
    private _within10km: boolean = false;
    public get within10km(): boolean { return this._within10km; }
    /** */
    public set within10km(value: boolean) {
        this._within10km = value;
    }

    /**営業時間内 */
    private _businessCondition: boolean = false;
    public get businessCondition(): boolean { return this._businessCondition; }
    /** 
     * trueならば現在営業時間内の店舗みでフィルターをかける。 
     * falseならばフィルターを解除する。
     * */
    public set businessCondition(value: boolean) {
        this._businessCondition = value;
        if (this.businessCondition) {
            let toDay = new Date();
            let shopTime = new ShopTime(`${toDay.getHours()}:${toDay.getMinutes()}`);
            //this.filterWithBusinnessTime(shopTime.getHours(), shopTime.getMinutes());
            console.log("A");
        } else {
            this.filterClear();
        }
    }



    /**午前中  */
    /*
    private _amCondition: boolean;
    public get amCondition(): boolean { return this._amCondition; }
    /**
     * trueならば午前中(06:00~12:00)に営業している店舗のみのフィルターをかける
     * falseならばフィルターを解除する。
     */
    /*
    public set amCondition(value: boolean) {
        this._amCondition = value;
        if (this._amCondition) {
            this.filterBetweenTime(6, 0, 12, 0);
        } else {
            this.filterClear();
        }
    }
    */

    /**午後 */
    private _pmCondition: boolean = false;
    public get pmCondition(): boolean { return this._pmCondition; }
    /**
     * trueならば午後(13:00~24:00)に営業している店舗のみのフィルターをかける
     * falseならばフィルターを解除する。
     */
    public set pmCondition(value: boolean) {
        this._pmCondition = value;
        if (this._pmCondition) {
            this.filterBetweenTime(15, 0);
            console.log("B");
        } else {
            this.filterClear();
        }
    }

    /**今日営業している店 */
    private _notHoliday: boolean = false;
    public get notHoliday(): boolean { return this._notHoliday; }
    /**
     * trueならば本日が営業日の店舗のみをフィルターする
     * falseならばフィルターを解除する。
     */
    public set notHoliday(value: boolean) {
        this._notHoliday = value;
        if (this._notHoliday) {
            let toDay = new Date();
            //this.filterBusinessDay(toDay.getDay());
            console.log("C");
        } else {
            this.filterClear();
        }
    }

    /**
     * うどん店舗をすべて取得する
     * @param request 
     * @returns 
     */
    public fetchUdonShops(request: UdonShopRequestModel): Promise<UdonShopResponseModel> {
        return new Promise((resolve, reject) => {
            this.udonShopRepository.fetchUdonShops(request).subscribe(response => {
                if (response.returnCode === 0) {
                    this.$udonShopOriginList = response.udonShops;
                    this.$udonShopOriginList.forEach(udon => {
                        udon.startTime = new ShopTime(udon.startTime).getDisplayTime();
                        udon.endTime = new ShopTime(udon.endTime).getDisplayTime();
                    });
                    this.$filteredUdonShopList = this.$udonShopOriginList;
                    this.$uodonShopSubject.next(this.$filteredUdonShopList);
                    resolve(response);
                } else { reject(response); }
            }, error => {
                reject(CommonApplicationMessage.UNREACHBLE_SERVER + "<br>" + UdonShopService.name);
            });
        });
    }

    /**
     * 指定した時間内に営業中の店にフィルターする
     * @param targetHour 
     * @param targetMiniutes 
     */
    private filterBetweenTime(targetH: number, targetM: number) {
        this.$filteredUdonShopList = this.$filteredUdonShopList.filter(shop => {
            let end = new ShopTime(shop.endTime);
            if (end.isUndefined()) { return false; }

            let endMin: number = end.getHours() * 60 + end.getMinutes();

            let targetEnd: number = targetH * 60 + targetM;
            return targetEnd < endMin;
        });
        this.$uodonShopSubject.next(this.$filteredUdonShopList);
    }

    /**
     * 
     */
    private filterWithBusinnessTime(targetHour: number, targetMiniutes: number) {
        this.$filteredUdonShopList = this.$filteredUdonShopList.filter(shop => {
            let start = new ShopTime(shop.startTime);
            let end = new ShopTime(shop.endTime);
            let startMin: number = start.getHours() * 60 + start.getMinutes();
            let endMin: number = end.getHours() * 60 + end.getMinutes();
            let target: number = targetHour * 60 + targetMiniutes;
            return (target > startMin) && (target < endMin);
        });
        this.$uodonShopSubject.next(this.$filteredUdonShopList);
    }

    /**
     * 指定した曜日に定休日がない店のみにフィルターする
     * @param udonShops 
     * @param targetDayofWeek 
     * @returns 
     */
    private filterBusinessDay(targetDayofWeek: number) {
        this.$filteredUdonShopList = this.$filteredUdonShopList.filter(shop => {
            let flag: boolean = true;
            shop.holidays.split('').forEach(holiday => {
                if (holiday === targetDayofWeek.toString()) {
                    flag = false;
                }
            });
            return flag;
        });
        this.$uodonShopSubject.next(this.$filteredUdonShopList);
    }

    /**
     * フィルターを解除する.
     */
    filterClear() {
        this.$filteredUdonShopList = this.$udonShopOriginList.slice();
        this.$uodonShopSubject.next(this.$filteredUdonShopList);
    }
}