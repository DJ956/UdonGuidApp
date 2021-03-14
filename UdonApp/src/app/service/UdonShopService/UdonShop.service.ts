import { Injectable } from "@angular/core";
import { UdonShopRequestModel } from "src/app/model/request/UdonShopRequest.model";
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
}