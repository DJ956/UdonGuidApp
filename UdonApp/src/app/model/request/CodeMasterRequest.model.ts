import { BaseRequestModel } from "./BaseRequest.model";

export interface CodeMasterRequestModel extends BaseRequestModel {
    /**カテゴリーコード */
    CategoryCd: string;
}