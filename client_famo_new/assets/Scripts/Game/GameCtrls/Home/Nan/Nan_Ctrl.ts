import EventMgr from "../../../../Framework/Managers/EventMgr";
import UIBase from "../../../../Framework/Managers/UIBase";
import DebugUtils from "../../../../Framework/Utils/DebugUtils";
import { EventKey } from "../../../Config/EventCfg";

const { ccclass, property } = cc._decorator;
/**
 * 破魔拳不足提示
 */
@ccclass
export default class Nan_Ctrl extends UIBase {
    onLoad() {
        super.onLoad();
        this.initUI();
        DebugUtils.Log("===========Nan_Ctrl.onLoad================");
    }

    start() {
        this.RunAnimation("node/bg");
    }

    private initUI(): void {
        this.AddButtonListener("node/bg/sp_bg/btn_close", this, this.onCloseBtn);
        this.AddButtonListener("node/bg/sp_bg/btn_buy", this, this.onBtnBuyClick);
    }

    // 前往兑换
    private onBtnBuyClick(): void {
        EventMgr.Instance.Emit(EventKey.UI_ShowShopMoney, "");
        this.node.destroy();
    }
}
