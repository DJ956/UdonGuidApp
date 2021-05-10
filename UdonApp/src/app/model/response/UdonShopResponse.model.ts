import { UdonShopModel } from "../resource/UdonShop.model";
import { BaseResponseModel } from "./BaseResponse.model";

export interface UdonShopResponseModel extends BaseResponseModel {
    udonShops: UdonShopModel[];
}