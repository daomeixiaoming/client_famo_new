import EventMgr from "../../../../Framework/Managers/EventMgr";
import UIBase from "../../../../Framework/Managers/UIBase";
import CocosUtils from "../../../../Framework/Utils/CocosUtils";
import { EventKey } from "../../../Config/EventCfg";
import GameLogic from "../../../GameLogic";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Loading_Ctrl extends UIBase {
    sp_bar: cc.ProgressBar;
    spIcon: cc.Node; //光

    onLoad() {
        super.onLoad();
        this.initUI();
        this.registerEvent();
    }

    protected onDestroy(): void {
        this.unRegisterEvent();
    }

    private initUI(): void {
        this.sp_bar = this.ViewComponent("node/bg/mask/progressBar", cc.ProgressBar) as cc.ProgressBar;
        this.sp_bar.progress = 0;

        // let lab = this.ViewComponent("node/bg/item_bg/lab", cc.Label) as cc.Label;
        // let ex = GameLogic.Instance.getExorcismVoucher();
        // let des = CocosUtils.formatNum(ex, 0);
        // lab.string = des;
    }

    private registerEvent(): void {
        EventMgr.Instance.AddEventListener(EventKey.UI_Loading, this, this.onUIEventLoading);
    }

    private unRegisterEvent(): void {
        EventMgr.Instance.RemoveListenner(EventKey.UI_Loading, this, this.onUIEventLoading);
    }

    // 显示加载进度
    private onUIEventLoading(uname: string, udata: number): void {
        this.sp_bar.progress = udata;
    }
}
