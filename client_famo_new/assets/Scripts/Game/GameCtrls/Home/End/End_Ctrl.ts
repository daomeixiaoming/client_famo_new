import { ResMgr } from "../../../../Framework/Managers/ResMgr";
import UIBase from "../../../../Framework/Managers/UIBase";
import GameUtils from "../../../../Framework/Utils/GameUtils";
import { protoGame } from "../../../../Proto/game";
import { AbNames, Atals1Cfg, AtalsCfg, Lngs } from "../../../Config/GameConfig";
import { BoxType, OpenBoxRequest } from "../../../Config/MsgCfg";
import { GuiCfg } from "../../../Config/ResConfig";
import GameApp from "../../../GameApp";
import GameLogic from "../../../GameLogic";

const { ccclass, property } = cc._decorator;
/**
 * Boss死亡:提示获得宝箱
 */
@ccclass
export default class End_Ctrl extends UIBase {
    lab_des: cc.Label;
    lab_num: cc.Label;
    sp_icon: cc.Sprite;
    atals: cc.SpriteAtlas;

    param: OpenBoxRequest = {};

    onLoad() {
        super.onLoad();
        this.initUI();
    }

    start() {
        this.RunAnimation("node/bg");
    }

    private initUI(): void {
        let spBg = this.ViewComponent("node/bg/sp_bg", cc.Sprite) as cc.Sprite;
        GameUtils.SetSpTexture(AbNames.Gui, GuiCfg.end_bg0, spBg);

        this.AddButtonListener("node/bg/sp_bg/btn_close", this, this.onCloseBtn);
        this.AddButtonListener("node/bg/sp_bg/btn", this, this.onStartOpenClick);
        this.AddButtonListener("node/bg/sp_bg/labCfg", this, this.onBoxCfgClick);

        this.lab_des = this.ViewComponent("node/bg/sp_bg/lab_des", cc.Label) as cc.Label;
        this.lab_num = this.ViewComponent("node/bg/sp_bg/sp_score_bg/lab_num", cc.Label) as cc.Label;
        this.sp_icon = this.ViewComponent("node/bg/sp_bg/sp_icon_di/sp_icon", cc.Sprite) as cc.Sprite;

        this.atals = ResMgr.Instance.getAsset(AbNames.Atals_Home, AtalsCfg.Home, cc.SpriteAtlas) as cc.SpriteAtlas;
    }

    public setData(data: protoGame.IBoxInfo): void {
        let btype = data.boxType;
        let path = null;
        let des = null;
        switch (btype) {
            case BoxType.Box_HJ:
                path = "end_icon_hj";
                des = Lngs.GetBox2;
                break;
            case BoxType.Box_BY:
                path = "end_icon_by";
                des = Lngs.GetBox1;
                break;
            case BoxType.Box_ZS:
                path = "end_icon_zs";
                des = Lngs.GetBox3;
                break;
            default:
                break;
        }

        if (des) {
            this.lab_des.string = des;
        }
        if (path) {
            GameUtils.SetSpData(AbNames.Atals1, Atals1Cfg.End, path, this.sp_icon);
        }
        this.param.id = data.id;
        this.param.num = 1;
    }

    // 点击立即开启
    private onStartOpenClick() {
        GameLogic.Instance.openBox(this.param);
        this.node.destroy();
    }

    // 点击规则
    private async onBoxCfgClick() {
        GameApp.Instance.showGameBoxCfgUI();
    }
}
