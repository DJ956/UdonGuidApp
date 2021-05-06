import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { APIUrl } from "src/app/consts/APIUrl";
import { UdonShopRequestModel } from "src/app/model/request/UdonShopRequest.model";
import { UdonShopResponseModel } from "src/app/model/response/UdonShopResponse.model";
import { UdonShopRepository } from "src/app/repository/UdonShopRepository/UdonShop.repository";

@Injectable({
    providedIn: 'root'
})
export class UdonShopImplRepository extends UdonShopRepository {

    constructor(private client: HttpClient) {
        super();
    }

    fetchUdonShops(request: UdonShopRequestModel): Observable<UdonShopResponseModel> {
        return this.client.post<UdonShopResponseModel>(`${APIUrl.BASE_URL}/api/UdonShopController/`, request);
    }

}