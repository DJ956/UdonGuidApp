import { Injectable } from "@angular/core";
import { CommonApplicationMessage } from "src/app/consts/CommonApplicationMessage";
import { CodeMasterRequestModel } from "src/app/model/request/CodeMasterRequest.model";
import { CodeMasterResponseModel } from "src/app/model/response/CodeMasterResponse.model";
import { CodeMasterRepository } from "src/app/repository/CodeMasterRepository/CodeMaster.repository";

@Injectable({
    providedIn: 'root'
})
export class CodeMasterService {

    constructor(private codeMasterRepository: CodeMasterRepository) { }

    public static readonly HOLIDAY: string = "Holiday";
    public static readonly RECOMMEND: string = "Recommend";

    public getCodeMasters(request: CodeMasterRequestModel): Promise<CodeMasterResponseModel> {
        return new Promise((resolve, rejects) => {
            this.codeMasterRepository.fetchCodeMaster(request).subscribe({
                next(response) {
                    if (response.returnCode === 0) {
                        resolve(response);
                    } else {
                        rejects(response.message);
                    }
                },
                error(e) {
                    rejects(CommonApplicationMessage.UNREACHBLE_SERVER + "<br>" + CodeMasterService.name);
                }
            });
        });
    }
}