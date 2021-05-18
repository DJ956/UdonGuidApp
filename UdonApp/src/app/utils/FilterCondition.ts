import { UdonShopModel } from "../model/resource/UdonShop.model";

export interface FilterCondition {
    /**
     * UdonShopモデルをフィルターする
     * @param model     
     * @param condition 追加のフィルター条件 
     */
    filterUdonModel(model: UdonShopModel, ...condition: any): boolean;
}