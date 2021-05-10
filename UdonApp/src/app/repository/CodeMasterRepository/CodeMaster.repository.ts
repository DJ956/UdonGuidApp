import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CodeMasterRequestModel } from "src/app/model/request/CodeMasterRequest.model";
import { CodeMasterResponseModel } from "src/app/model/response/CodeMasterResponse.model";

@Injectable({
    providedIn: 'root'
})
export abstract class CodeMasterRepository {
    abstract fetchCodeMaster(request: CodeMasterRequestModel): Observable<CodeMasterResponseModel>;
}