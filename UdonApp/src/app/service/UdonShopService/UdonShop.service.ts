import { Injectable } from "@angular/core";
import { UdonShopRequestModel } from "src/app/model/request/UdonShopRequest.model";
import { UdonShopModel } from "src/app/model/resource/UdonShop.model";
import { UdonShopResponseModel } from "src/app/model/response/UdonShopResponse.model";
import { UdonShopRepository } from "src/app/repository/UdonShopRepository/UdonShop.repository";


@Injectable({
    providedIn:'root'
})
export class UdonShopService{

    public $udonShops:UdonShopModel[]
    constructor(private udonShopRepository:UdonShopRepository){                    
        this.$udonShops = [];        
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
                        this.$udonShops = response.UdonShops;
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