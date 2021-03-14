import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { UdonShopRequestModel } from "src/app/model/request/UdonShopRequest.model";
import { UdonShopResponseModel } from "src/app/model/response/UdonShopResponse.model";
import { UdonShopRepository } from "src/app/repository/UdonShopRepository/UdonShop.repository";

@Injectable({
    providedIn:'root'
})
export class MockUdonShopRepository extends UdonShopRepository{

    fetchUdonShops(request: UdonShopRequestModel): Observable<UdonShopResponseModel> {
        
        let response:UdonShopResponseModel = {
            ReturnCode:0,
            Message:'',
            ErrorCode:'',
            ErrorCause:'',
            UdonShops:[
                {
                    Id:0,
                    Name:'',
                    ShopType:0,
                    StartTime:new Date(0,0,0,12,30,0,0),
                    EndTime:new Date(0,0,0,15,30,0,0),
                    Holidays:[
                        {Id:0, Name:"日曜日"},
                        {Id:1,Name:"土曜日"}
                    ],
                    ExistsCoinParking:true,
                    ExistsParking:true,
                    Comment:'サンプルコメント'
                },
            ]
        };

        return new Observable((observer) =>{
            of(1)                        
            .subscribe((res) =>{
                observer.next(response);
            });
        });
    }

}

