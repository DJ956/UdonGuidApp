import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { CommonApplicationMessage } from "src/app/consts/CommonApplicationMessage";
import { CodeMasterRequestModel } from "src/app/model/request/CodeMasterRequest.model";
import { CodeMasterModel } from "src/app/model/resource/CodeMaster.model";
import { CodeMasterResponseModel } from "src/app/model/response/CodeMasterResponse.model";
import { CodeMasterRepository } from "src/app/repository/CodeMasterRepository/CodeMaster.repository";

@Injectable({
    providedIn: 'root'
})
export class CodeMasterService {


    public static readonly HOLIDAY: string = "Holiday";
    public static readonly RECOMMEND: string = "Recommend";

    private $holidaysOrign: CodeMasterModel[];
    private $holidaysSubject: BehaviorSubject<CodeMasterModel[]>;

    /**
     * CodeMasterの休日オブサーバ
     */
    public $holidayObserver: Observable<CodeMasterModel[]>;

    constructor(private codeMasterRepository: CodeMasterRepository) {
        this.$holidaysOrign = [];
        this.$holidaysSubject = new BehaviorSubject<CodeMasterModel[]>([]);
        this.$holidayObserver = this.$holidaysSubject.asObservable();
    }


    public getCodeMasters(request: CodeMasterRequestModel): Promise<CodeMasterResponseModel> {
        return new Promise((resolve, rejects) => {
            this.codeMasterRepository.fetchCodeMaster(request).subscribe(response => {
                if (response.returnCode === 0) {
                    this.$holidaysOrign = response.codeMasters;
                    this.$holidaysSubject.next(this.$holidaysOrign);
                    console.log("next");
                    resolve(response);
                } else {
                    rejects(response.message);
                }
            }, error => {
                rejects(CommonApplicationMessage.UNREACHBLE_SERVER + "<br>" + CodeMasterService.name);
            });
        });
    }
}