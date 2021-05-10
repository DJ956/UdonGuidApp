import { HolidayModel } from './Holiday.model';

export interface UdonShopModel {
    id: number,                  //ID
    shopName: string,                //店名
    shopType: Number,            //0:一般店 1:セルフ 2:製麺所
    startTime: string,             //営業開始時間
    endTime: string,               //営業終了時間
    holidays: string,    //定休日リスト
    existsCoinParking: boolean,  //コインパーキングあり
    existsParking: boolean       //駐車場有
    comment: string,             //コメント
    mapURL: string,              //GoogleMapURL
}