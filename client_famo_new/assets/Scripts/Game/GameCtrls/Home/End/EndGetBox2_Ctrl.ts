import EventMgr from "../../../../Framework/Managers/EventMgr";
import UIBase from "../../../../Framework/Managers/UIBase";
import DebugUtils from "../../../../Framework/Utils/DebugUtils";
import GameUtils from "../../../../Framework/Utils/GameUtils";
import { EventKey } from "../../../Config/EventCfg";
import { AbNames, Lngs } from "../../../Config/GameConfig";
import { BoxType, GiftItem, OpenBoxRequest } from "../../../Config/MsgCfg";
import { GuiCfg } from "../../../Config/ResConfig";
import NetHttpMgr from "../../../Data/NetHttpMgr";
import GameLogic from "../../../GameLogic";
import EndGetBoxItem_Ctrl from "./EndGetBoxItem_Ctrl";

const { ccclass, property } = cc._decorator;
/**
 * 开启宝箱，获得奖励界面，开启单个
 */
@ccclass
export default class EndGetBox2_Ctrl extends UIBase {
    giftCom: EndGetBoxItem_Ctrl;
    lab_des: cc.Label;
    lab_num: cc.Label;
    lab_last: cc.Label;
    reqData: OpenBoxRequest = {};
    onLoad() {
        super.onLoad();
        this.initUI();
    }

    start() {
        this.RunAnimation("node/bg");
    }

    protected onDestroy(): void {
    }

    private initUI(): void {
        let spBg = this.ViewComponent("node/bg/sp_bg", cc.Sprite) as cc.Sprite;
        GameUtils.SetSpTexture(AbNames.Gui, GuiCfg.end_bg0, spBg);

        this.AddButtonListener("node/bg/sp_bg/btn_close", this, this.onCloseBtn);
        this.AddButtonListener("node/bg/sp_bg/btns/btn1", this, this.onBtnClickOne);
        this.AddButtonListener("node/bg/sp_bg/btns/btn2", this, this.onBtnClickAll);

        // 礼物item
        let giftItem = this.view["node/bg/sp_bg/EndGetBoxItem"];
        this.giftCom = giftItem.addComponent(EndGetBoxItem_Ctrl) as EndGetBoxItem_Ctrl;

        // 价值
        this.lab_des = this.ViewComponent("node/bg/sp_bg/labs/lab_des", cc.Label) as cc.Label;
        this.lab_num = this.ViewComponent("node/bg/sp_bg/labs/lab_num", cc.Label) as cc.Label;
        this.lab_num.string = "0";

        // 个数
        this.lab_last = this.ViewComponent("node/bg/sp_bg/layout/lab_num", cc.Label) as cc.Label;
    }

    // 开启一个
    private onBtnClickOne() {
        this.reqData.num = 1;
        this.openBoxReq();
    }

    // 全部开放
    private onBtnClickAll() {
        this.reqData.num = 65535;
        this.openBoxReq();
    }

    //请求开宝箱
    private openBoxReq() {
        DebugUtils.Log("========EndGetBox2_Ctrl.openBoxReq=========", this.reqData);
        GameLogic.Instance.openBox(this.reqData);
        this.node.destroy();
    }

    /**
    * 
    * @param udata 奖励列表
    * @param type 宝箱类型
    */
    public setData(udata: GiftItem, type: number) {
        this.giftCom.setData(udata);
        DebugUtils.Log("==========EndGetBox2_Ctrl.setData1=========", udata);

        let des = "";
        switch (type) {
            case BoxType.Box_BY:
                des = Lngs.GetBoxDes1;
                break;
            case BoxType.Box_HJ:
                des = Lngs.GetBoxDes2;
                break;
            case BoxType.Box_ZS:
                des = Lngs.GetBoxDes3;
                break;
            default:
                break;
        }
        this.lab_des.string = des;

        let total = udata.giftPrice;
        this.lab_num.string = total.toString();

        let lastNum = GameLogic.Instance.GetBoxByType(type);
        this.lab_last.string = `${lastNum}${Lngs.One}`;

        this.reqData.type = type;
        this.reqData.num = lastNum;
    }

    private onHttpMsgOpenBoxRes(uname: string, udata: any) {
        this.node.destroy();
    }
}
