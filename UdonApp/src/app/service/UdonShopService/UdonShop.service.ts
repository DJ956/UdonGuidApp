import { Injectable } from "@angular/core";
import { UdonShopRequestModel } from "src/app/model/request/UdonShopRequest.model";
import { UdonShopModel } from "src/app/model/resource/UdonShop.model";
import { UdonShopResponseModel } from "src/app/model/response/UdonShopResponse.model";
import { UdonShopRepository } from "src/app/repository/UdonShopRepository/UdonShop.repository";


@Injectable({
    providedIn:'root'
})
export class UdonShopService{

    constructor(private udonShopRepository:UdonShopRepository){                             
    }


    /**
     * うどん店舗をすべて取得する
     * @param request 
     * @returns 
     */
    fetchUdonShops(request : UdonShopRequestModel) : Promise<UdonShopResponseModel>{
        return new Promise((resolve, reject) =>{
            this.udonShopRepository.fetchUdonShops(request).subscribe({
                next(response){
                    if(response.ReturnCode === 0){
                        resolve(response);
                    }else{
                        reject(response.Message);
                    }
                },
                error(e){
                    reject(e);
                }
            });
        });        
    }

    /**
     * 指定した時間内に営業中の店にフィルターする
     * @param targetHour 
     * @param targetMiniutes 
     */
    filterBetweenTime(udonShops:UdonShopModel[], targetHour:number, targetMiniutes:number) : UdonShopModel[]{        
        return udonShops.filter(shop =>{            
            let startMin : number = shop.StartTime.getHours() * 60 + shop.StartTime.getMinutes();
            let endMin   : number = shop.EndTime.getHours() * 60 + shop.EndTime.getMinutes();
            let target   : number = targetHour * 60 + targetMiniutes;            
            return (target > startMin) && (target < endMin);
        });
    }

    /**
     * 指定した曜日に定休日がない店のみにフィルターする
     * @param udonShops 
     * @param targetDayofWeek 
     * @returns 
     */
    filterBusinessDay(udonShops:UdonShopModel[], targetDayofWeek:number) : UdonShopModel[]{
        return udonShops.filter(shop =>{
            let flag : boolean = true;
            shop.Holidays.forEach(holiday =>{
                if(holiday.Id === targetDayofWeek){
                    flag = false;                     
                }
            });

            return flag;
        })
    }

}