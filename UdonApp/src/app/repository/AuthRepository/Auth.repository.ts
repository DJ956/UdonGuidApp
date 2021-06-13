import { Observable } from "rxjs";
import { UserLogInRequestModel } from "src/app/model/request/UserLogInRequest.model";
import { UserLogOutRequestModel } from "src/app/model/request/UserLogOutRequest.model";
import { UserRegistryRequestModel } from "src/app/model/request/UserRegistryRequest.model";
import { UserLogInResponseModel } from "src/app/model/response/UserLogInResponse.model";
import { UserLogOutResponseModel } from "src/app/model/response/UserLogOutResponse.model";
import { UserRegistryResponseModel } from "src/app/model/response/UserRegistryResponse.model";

export abstract class AuthRepository {

    abstract logIn(request: UserLogInRequestModel): Observable<UserLogInResponseModel>;

    abstract logOut(request: UserLogOutRequestModel): Observable<UserLogOutResponseModel>;

    abstract registry(request: UserRegistryRequestModel): Observable<UserRegistryResponseModel>;
}