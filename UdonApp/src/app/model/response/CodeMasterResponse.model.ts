import { CodeMasterModel } from "../resource/CodeMaster.model";
import { BaseResponseModel } from "./BaseResponse.model";

export interface CodeMasterResponseModel extends BaseResponseModel {
    /**コードマスタリスト */
    codeMasters: CodeMasterModel[];
}