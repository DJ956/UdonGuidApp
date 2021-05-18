import { HostListener, Injectable } from "@angular/core";
import { CommonApplicationMessage } from "src/app/consts/CommonApplicationMessage";
import { CodeMasterRequestModel } from "src/app/model/request/CodeMasterRequest.model";
import { CodeMasterModel } from "src/app/model/resource/CodeMaster.model";
import { CodeMasterResponseModel } from "src/app/model/response/CodeMasterResponse.model";
import { CodeMasterRepository } from "src/app/repository/CodeMasterRepository/CodeMaster.repository";

@Injectable({
    providedIn: 'root'
})
export class CodeMasterService {

    constructor(private codeMasterRepository: CodeMasterRepository) {
        this.holidays = [];
    }

    public static readonly HOLIDAY: string = "Holiday";
    public static readonly RECOMMEND: string = "Recommend";


    private holidays: CodeMasterModel[];
    /**
     * 休日コードマスタを取得する。
     * 今まで一度も取得されていなかった場合、サーバへ通信し取得する
     */
    public get Holidays(): CodeMasterModel[] {
        if (this.holidays.length > 0) { return this.holidays; }

        try {
            const request: CodeMasterRequestModel = {
                UserId: '',
                CategoryCd: CodeMasterService.HOLIDAY
            };
            this.getCodeMasters(request).then(response => {
                this.holidays = response.codeMasters;
            });
        } catch (e) {
            throw e
        }
        return this.holidays;
    };


    private recommends: CodeMasterModel[];
    /**
     * おすすめコードマスタを取得する。
     * 今まで一度も取得されていなかった場合、サーバへ通信し取得する
     */
    public get Recommends(): CodeMasterModel[] {
        if (this.recommends.length > 0) { return this.recommends; }

        try {
            const request: CodeMasterRequestModel = {
                UserId: '',
                CategoryCd: CodeMasterService.RECOMMEND
            };
            this.getCodeMasters(request).then(response => {
                this.recommends = response.codeMasters;
            });
        } catch (e) {
            throw e
        }
        return this.recommends;
    }

    private getCodeMasters(request: CodeMasterRequestModel): Promise<CodeMasterResponseModel> {
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