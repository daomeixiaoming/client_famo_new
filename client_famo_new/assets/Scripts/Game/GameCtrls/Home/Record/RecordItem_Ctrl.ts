import UIBase from "../../../../Framework/Managers/UIBase";
import { Lngs } from "../../../Config/GameConfig";
import { RewardHistoryItem } from "../../../Config/MsgCfg";

const { ccclass, property } = cc._decorator;

/**
 * 中将记录Item节点
 */
@ccclass
export default class RecordItem_Ctrl extends UIBase {
    lab_num1: cc.Label;
    lab_num2: cc.Label;
    lab_num3: cc.Label;
    private _isLoaded: boolean = false;

    onLoad() {
        this._applyData();
        this._isLoaded = true;
    }

    private _applyData() {
        super.onLoad();
        this.initUI();
    }

    private initUI(): void {
        this.lab_num1 = this.ViewComponent("lab1", cc.Label) as cc.Label; //奖励
        this.lab_num2 = this.ViewComponent("lab2", cc.Label) as cc.Label; //伤害
        this.lab_num3 = this.ViewComponent("lab3", cc.Label) as cc.Label; //时间
    }

    public setData(data: RewardHistoryItem, pos: number): void {
        if (!this._isLoaded) {
            this._applyData();
        }
        let hurt = data.hurt;
        let reward = this.formatNum(data.reward, 0);
        this.lab_num1.string = reward;
        this.lab_num2.string = `${Lngs.RankHurt}${hurt}`;
        this.lab_num3.string = data.time;
    }

    private formatNum(num: number, fixed: number) {
        let des = '';
        if (num < 99999) {
            return num.toString();
        } else {
            let formattedNum = (num / 10000).toFixed(fixed);
            des = `${formattedNum}w`;
        }
        return des;
    }
}
