import { Injectable } from "@angular/core";
import { CommonApplicationMessage } from "src/app/consts/CommonApplicationMessage";
import { UserLogInRequestModel } from "src/app/model/request/Auth/UserLogInRequest.model";
import { UserLogOutRequestModel } from "src/app/model/request/Auth/UserLogOutRequest.model";
import { UserRegistryRequestModel } from "src/app/model/request/Auth/UserRegistryRequest.model";
import { UserInfoModel } from "src/app/model/resource/UserInfo.model";
import { UserLogInResponseModel } from "src/app/model/response/Auth/UserLogInResponse.model";
import { UserLogOutResponseModel } from "src/app/model/response/Auth/UserLogOutResponse.model";
import { UserRegistryResponseModel } from "src/app/model/response/Auth/UserRegistryResponse.model";
import { AuthRepository } from "src/app/repository/AuthRepository/Auth.repository";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _logInInfo: UserInfoModel;
    public get logInInfo(): UserInfoModel { return this._logInInfo; }

    public isLogIn(): boolean {
        if (this._logInInfo === null) { return false; }
        return this._logInInfo.userId !== -1;
    }


    constructor(private repository: AuthRepository) {
        this._logInInfo = null;
    }

    /**
     * ログインする
     * @param request 
     * @returns 
     */
    public logIn(request: UserLogInRequestModel): Promise<UserLogInResponseModel> {
        return new Promise((resolve, rejects) => {
            this.repository.logIn(request).subscribe(
                (response) => {
                    if (response.returnCode === 0 && response.message === '') {
                        this._logInInfo = {
                            userId: response.userId,
                            userName: request.UserName,
                            accessToken: response.accsessToken
                        };
                        resolve(response);
                    } else {
                        rejects(response.message);
                    }
                }, (error) => {
                    rejects(CommonApplicationMessage.UNREACHBLE_SERVER + "<br>" + AuthService.name);
                });
        });
    }

    /**
     * ログアウトする
     * @param request
     * @returns 
     */
    public logOut(request: UserLogOutRequestModel): Promise<UserLogOutResponseModel> {
        return new Promise((resolve, rejects) => {
            this.repository.logOut(request).subscribe(
                (response) => {
                    if (response.returnCode === 0 && response.message === '') {
                        this._logInInfo = undefined;
                        resolve(response);
                    } else {
                        rejects(response.message);
                    }
                }, (error) => {
                    rejects(CommonApplicationMessage.UNREACHBLE_SERVER + "<br>" + AuthService.name);
                });
        });
    }

    /**
     * ユーザ登録する
     * #TODO:その後ログインしてアクセストークンを取得するように
     * @param request 
     * @returns 
     */
    public registry(request: UserRegistryRequestModel): Promise<UserRegistryResponseModel> {
        return new Promise((resolve, rejects) => {
            this.repository.registry(request).subscribe(
                (response) => {
                    if (response.returnCode === 0 && response.message === '') {
                        resolve(response);
                    } else {
                        rejects(response.message);
                    }
                }, (error) => {
                    rejects(CommonApplicationMessage.UNREACHBLE_SERVER + "<br>" + AuthService.name);
                });
        });
    }
}