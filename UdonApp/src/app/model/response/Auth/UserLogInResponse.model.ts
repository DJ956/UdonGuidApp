import { BaseResponseModel } from "../BaseResponse.model";

/**
 * ユーザログインレスポンスモデル
 */
export interface UserLogInResponseModel extends BaseResponseModel {
    /**ユーザID */
    userId: number;
    /**アクセストークン */
    accsessToken: string;
}