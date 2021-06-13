import { BaseRequestModel } from "../BaseRequest.model";

/**
 * ユーザ登録リクエストモデル
 */
export interface UserRegistryRequestModel extends BaseRequestModel {
    /**登録ユーザ名 */
    userName: string;

    /**パスワード */
    password: string;
}