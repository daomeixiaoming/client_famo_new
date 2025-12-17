import EventMgr from "../../../../Framework/Managers/EventMgr";
import UIBase from "../../../../Framework/Managers/UIBase";
import { EventKey } from "../../../Config/EventCfg";
import { Lngs } from "../../../Config/GameConfig";

const { ccclass, property } = cc._decorator;
/**
 * 玩法公约
 */
@ccclass
export default class Agree_Ctrl extends UIBase {
    content: cc.Node;
    labContent: cc.Label;
    onLoad() {
        super.onLoad();
        this.initUI();
    }

    private initUI(): void {
        this.AddButtonListener("content/notice_bg/btnClose", this, this.onBtnCloseClick);
        this.AddButtonListener("content/notice_bg/btnAgreeClose", this, this.onBtnClick);
        this.labContent = this.ViewComponent("content/notice_bg/ScrollView/view/content/Label",cc.Label) as cc.Label;

        this.content = this.view["content/notice_bg"] as cc.Node;
        this.content.y = -1500;
        cc.Tween.stopAllByTarget(this.content);
        cc.tween(this.content).to(0.3, { position: cc.v3(0, 0, 0) }).start();
    }

    protected start(): void {
        this.labContent.string = Lngs.Agree;
    }

    private onBtnClick(): void {
        cc.sys.localStorage.setItem("agree_notice", "1");
        EventMgr.Instance.Emit(EventKey.UI_Agree_True, "");
        this.node.destroy();
    }

    private onBtnCloseClick(): void {
        // 添加音效
        cc.Tween.stopAllByTarget(this.content);
        cc.tween(this.content).to(0.3, { position: cc.v3(0, -1080, 0) }).call(() => {
            this.node.destroy();
        }).start();
    }
}
