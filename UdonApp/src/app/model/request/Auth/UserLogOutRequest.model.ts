import { BaseRequestModel } from "../BaseRequest.model";

/**
 * ログアウトリクエストモデル
 */
export interface UserLogOutRequestModel extends BaseRequestModel {
    /**アクセストークン */
    accsessToken: string;
}