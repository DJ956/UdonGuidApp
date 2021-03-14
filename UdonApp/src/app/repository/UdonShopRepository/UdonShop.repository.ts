import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UdonShopRequestModel } from "src/app/model/request/UdonShopRequest.model";
import { UdonShopResponseModel } from "src/app/model/response/UdonShopResponse.model";

@Injectable({
    providedIn:'root'
})
export abstract class UdonShopRepository{

    abstract fetchUdonShops(request:UdonShopRequestModel) : Observable<UdonShopResponseModel>;
}