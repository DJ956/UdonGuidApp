import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { APIUrl } from "src/app/consts/APIUrl";
import { CodeMasterRequestModel } from "src/app/model/request/CodeMasterRequest.model";
import { CodeMasterResponseModel } from "src/app/model/response/CodeMasterResponse.model";
import { CodeMasterRepository } from "src/app/repository/CodeMasterRepository/CodeMaster.repository";

@Injectable({
    providedIn: 'root'
})
export class CodeMasterImplRepository extends CodeMasterRepository {

    constructor(private client: HttpClient) {
        super();
    }

    fetchCodeMaster(request: CodeMasterRequestModel): Observable<CodeMasterResponseModel> {
        return this.client.post<CodeMasterResponseModel>(`${APIUrl.BASE_URL}/api/CodeMaster/GetCodeMaster`, request);
    }

}