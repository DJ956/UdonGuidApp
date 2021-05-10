import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { CommonApplicationMessage } from "src/app/consts/CommonApplicationMessage";
import { UdonShopRequestModel } from "src/app/model/request/UdonShopRequest.model";
import { UdonShopModel } from "src/app/model/resource/UdonShop.model";
import { UdonShopResponseModel } from "src/app/model/response/UdonShopResponse.model";
import { UdonShopRepository } from "src/app/repository/UdonShopRepository/UdonShop.repository";


@Injectable({
    providedIn: 'root'
})
export class UdonShopService {

    constructor(private udonShopRepository: UdonShopRepository) {
        this.$udonShopOriginList = [];
        this.$uodonShopSubject = new BehaviorSubject<UdonShopModel[]>([]);
        this.$udonShopObserver = this.$uodonShopSubject.asObservable();
    }

    /**リストのオリジナル */
    private $udonShopOriginList: UdonShopModel[];
    /**リストのサブジェクト この変数のnextが実行されて時、オブサーバで購買している値が変更される。 */
    private $uodonShopSubject: BehaviorSubject<UdonShopModel[]>;

    /**UdonShopのオブサーバ */
    public $udonShopObserver: Observable<UdonShopModel[]>;


    /**文字列からDateに変換 */
    private str2Time(strTime: string): Date { return new Date(`1990-01-01 ${strTime}`); }

    /**
     * うどん店舗をすべて取得する
     * @param request 
     * @returns 
     */
    fetchUdonShops(request: UdonShopRequestModel): Promise<UdonShopResponseModel> {
        return new Promise((resolve, reject) => {
            this.udonShopRepository.fetchUdonShops(request).subscribe(response => {
                if (response.returnCode === 0) {
                    this.$udonShopOriginList = response.udonShops;
                    this.$uodonShopSubject.next(this.$udonShopOriginList);
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
    filterBetweenTime(targetHour: number, targetMiniutes: number) {
        let tmps: UdonShopModel[] = this.$udonShopOriginList.slice();
        tmps = tmps.filter(shop => {
            let startMin: number = this.str2Time(shop.startTime).getHours() * 60 + this.str2Time(shop.startTime).getMinutes();
            let endMin: number = this.str2Time(shop.endTime).getHours() * 60 + this.str2Time(shop.endTime).getMinutes();
            let target: number = targetHour * 60 + targetMiniutes;
            return (target > startMin) && (target < endMin);
        });
        this.$uodonShopSubject.next(tmps);
    }

    /**
     * 指定した曜日に定休日がない店のみにフィルターする
     * @param udonShops 
     * @param targetDayofWeek 
     * @returns 
     */
    filterBusinessDay(targetDayofWeek: number) {
        let tmps: UdonShopModel[] = this.$udonShopOriginList.slice();
        tmps = tmps.filter(shop => {
            let flag: boolean = true;
            shop.holidays.split('').forEach(holiday => {
                if (holiday === targetDayofWeek.toString()) {
                    flag = false;
                }
            });
        });
        this.$uodonShopSubject.next(tmps);
    }
}