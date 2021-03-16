import {HolidayModel} from './Holiday.model';

export interface UdonShopModel{
    Id:number,                  //ID
    Name:string,                //店名
    ShopType:Number,            //0:一般店 1:セルフ 2:製麺所
    StartTime:Date,             //営業開始時間
    EndTime:Date,               //営業終了時間
    Holidays:HolidayModel[],    //定休日リスト
    ExistsCoinParking:boolean,  //コインパーキングあり
    ExistsParking:boolean       //駐車場有
    Comment:string,             //コメント
    MapURL:string,              //GoogleMapURL
}