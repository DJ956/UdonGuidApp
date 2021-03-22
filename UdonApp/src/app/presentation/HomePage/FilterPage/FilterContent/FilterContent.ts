import { Component, Injectable, OnInit } from '@angular/core';

@Injectable({
    providedIn:"root"
})
@Component({
    selector:"app-FilterContent",
    templateUrl:"./FilterContent.html",
    styleUrls:["./FilterContent.css"]
})
export class FilterContent implements OnInit{

    constructor(){
        this.within5km = true;
        this.within10km = false;

        this.businessCondition = true;
        this.amCondition = false;
        this.pmCondition = false;

        this.notHoliday = true;
    }

    /**5km圏内に店がある */
    public within5km : boolean;
    /**10km圏内に店がある */
    public within10km: boolean;

    /**営業時間内 */
    public businessCondition:boolean;
    /**午前中 */
    public amCondition:boolean;
    /**午後 */
    public pmCondition:boolean;

    /**今日営業している店 */
    public notHoliday:boolean;

    ngOnInit(): void {
    }

    /**
     * 現在時刻が午後かどうか
     * @returns 
     */
    private isPM() : boolean{        
        return new Date().getHours() > 12
    }    

}