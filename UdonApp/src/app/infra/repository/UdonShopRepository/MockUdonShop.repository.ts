import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { UdonShopRequestModel } from "src/app/model/request/UdonShopRequest.model";
import { UdonShopResponseModel } from "src/app/model/response/UdonShopResponse.model";
import { UdonShopRepository } from "src/app/repository/UdonShopRepository/UdonShop.repository";

@Injectable({
    providedIn: 'root'
})
export class MockUdonShopRepository extends UdonShopRepository {

    fetchUdonShops(request: UdonShopRequestModel): Observable<UdonShopResponseModel> {

        let response: UdonShopResponseModel = {
            returnCode: 0,
            message: '',
            errorCode: '',
            errorCause: '',
            udonShops: [
                {
                    id: 0,
                    shopName: 'さかえだ',
                    shopType: 0,
                    startTime: "12:30:00",
                    endTime: "15:00:00",
                    holidays: "0",
                    existsCoinParking: true,
                    existsParking: true,
                    comment: 'サンプルコメント',
                    mapURL: "",
                },

                {
                    id: 0,
                    shopName: 'たもや',
                    shopType: 1,
                    startTime: "12:30:00",
                    endTime: "14:00:00",
                    holidays: "0",
                    existsCoinParking: true,
                    existsParking: true,
                    comment: 'サンプルコメント',
                    mapURL: "",
                },

                {
                    id: 0,
                    shopName: '根っこ',
                    shopType: 0,
                    startTime: "09:30:00",
                    endTime: "23:30:00",
                    holidays: "0",
                    existsCoinParking: true,
                    existsParking: true,
                    comment: 'サンプルコメント',
                    mapURL: "",
                }
            ]
        };

        return new Observable((observer) => {
            of(1)
                .subscribe((res) => {
                    observer.next(response);
                });
        });
    }

}

