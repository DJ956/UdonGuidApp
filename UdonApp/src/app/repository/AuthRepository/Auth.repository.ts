import { Observable } from "rxjs";
import { UserLogInRequestModel } from "src/app/model/request/Auth/UserLogInRequest.model";
import { UserLogOutRequestModel } from "src/app/model/request/Auth/UserLogOutRequest.model";
import { UserRegistryRequestModel } from "src/app/model/request/Auth/UserRegistryRequest.model";
import { UserLogInResponseModel } from "src/app/model/response/Auth/UserLogInResponse.model";
import { UserLogOutResponseModel } from "src/app/model/response/Auth/UserLogOutResponse.model";
import { UserRegistryResponseModel } from "src/app/model/response/Auth/UserRegistryResponse.model";
export abstract class AuthRepository {

    abstract logIn(request: UserLogInRequestModel): Observable<UserLogInResponseModel>;

    abstract logOut(request: UserLogOutRequestModel): Observable<UserLogOutResponseModel>;

    abstract registry(request: UserRegistryRequestModel): Observable<UserRegistryResponseModel>;
}