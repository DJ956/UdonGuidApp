
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { APIUrl } from "src/app/consts/APIUrl";
import { UserLogInRequestModel } from "src/app/model/request/UserLogInRequest.model";
import { UserLogOutRequestModel } from "src/app/model/request/UserLogOutRequest.model";
import { UserRegistryRequestModel } from "src/app/model/request/UserRegistryRequest.model";
import { UserLogInResponseModel } from "src/app/model/response/UserLogInResponse.model";
import { UserLogOutResponseModel } from "src/app/model/response/UserLogOutResponse.model";
import { UserRegistryResponseModel } from "src/app/model/response/UserRegistryResponse.model";
import { AuthRepository } from "src/app/repository/AuthRepository/Auth.repository";

@Injectable({
    providedIn: 'root'
})
export class AuthImplRepository extends AuthRepository {

    constructor(private client: HttpClient) {
        super();
    }

    logIn(request: UserLogInRequestModel): Observable<UserLogInResponseModel> {
        return this.client.post<UserLogInResponseModel>(`${APIUrl.BASE_URL}/api/UdonUser/login`, request);
    }

    logOut(request: UserLogOutRequestModel): Observable<UserLogOutResponseModel> {
        return this.client.post<UserLogOutResponseModel>(`${APIUrl.BASE_URL}/api/UdonUser/logout`, request);
    }
    registry(request: UserRegistryRequestModel): Observable<UserRegistryResponseModel> {
        return this.client.post<UserRegistryResponseModel>(`${APIUrl.BASE_URL}/api/UdonUser/registry`, request);
    }

}