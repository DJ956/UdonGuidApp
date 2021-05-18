/**30時間制 に設定するクラス */
export class ShopTime {

    private _timeStr: string;

    private _hour: number;
    private _min: number;
    /**不明かどうか */
    private _isUndefined: boolean;


    constructor(timeStr: string) {
        this._isUndefined = false;
        this._timeStr = timeStr;
        let date = this.str2Time(timeStr);
        if (date.getHours() == NaN) {
            throw new Error(`${timeStr}は日付の形式ではありません`);
        }

        //hh:mm:ss -> hh:mm
        if (this._timeStr.length == 8) { this._timeStr.substring(0, 5); }
        //開始時間が0:00と終了時間が0:00の場合、営業時間は不明とする
        if (this._timeStr === "0:00") {
            this._timeStr = "不明";
            this._isUndefined = true;
            return;
        }

        this._hour = Number.parseInt(this._timeStr.substring(0, 2));
        this._min = Number.parseInt(this._timeStr.substring(3, 5));
        //営業終了時間が5:00より前の時間の場合、深夜扱いにする                                
        if (this._hour < 5) { this._hour += 24; }
    }



    /**営業時間が不明かどうか */
    public isUndefined(): boolean { return this._isUndefined; }

    public getHours(): number { return this._hour; }

    public getMinutes(): number { return this._min; }

    /** hh:mm形式の文字列を返す */
    public getDisplayTime(): string {
        if (this.isUndefined()) { return this._timeStr; }
        return `${this.getHours()}:${this.getMinutes().toString().padStart(2, "0")}`;
    }

    /**文字列からDateに変換 */
    private str2Time(strTime: string): Date { return new Date(`1990-01-01 ${strTime}`); }
}