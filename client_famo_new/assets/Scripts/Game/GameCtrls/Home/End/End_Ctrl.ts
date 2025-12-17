import { ResMgr } from "../../../../Framework/Managers/ResMgr";
import UIBase from "../../../../Framework/Managers/UIBase";
import UIMgr from "../../../../Framework/Managers/UIMgr";
import { protoGame } from "../../../../Proto/game";
import { AbNames, AtalsCfg, Lngs } from "../../../Config/GameConfig";
import { BoxType, OpenBoxRequest } from "../../../Config/MsgCfg";
import { ResCfg } from "../../../Config/ResConfig";
import NetHttpMgr from "../../../Data/NetHttpMgr";
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
        this.AddButtonListener("node/bg/sp_bg/btn_close", this, this.onCloseBtn);
        this.AddButtonListener("node/bg/sp_bg/btn", this, this.onStartOpenClick);
        this.AddButtonListener("node/bg/sp_bg/labCfg", this, this.onBoxCfgClick);

        this.lab_des = this.ViewComponent("node/bg/sp_bg/lab_des", cc.Label) as cc.Label;
        this.lab_num = this.ViewComponent("node/bg/sp_bg/lab_num", cc.Label) as cc.Label;
        this.sp_icon = this.ViewComponent("node/bg/sp_bg/sp_icon", cc.Sprite) as cc.Sprite;

        this.atals = ResMgr.Instance.getAsset(AbNames.Atals_Home, AtalsCfg.Home, cc.SpriteAtlas) as cc.SpriteAtlas;
    }

    public setData(data: protoGame.IBoxInfo): void {
        let btype = data.boxType;
        let path = null;
        let des = null;
        switch (btype) {
            case BoxType.Box_HJ:
                path = "hoem_box2";
                des = Lngs.GetBox2;
                break;
            case BoxType.Box_BY:
                path = "hoem_box1";
                des = Lngs.GetBox1;
                break;
            case BoxType.Box_ZS:
                path = "hoem_box3";
                des = Lngs.GetBox3;
                break;
            default:
                break;
        }

        if (des) {
            this.lab_des.string = des;
        }
        if (path) {
            let sf = this.atals.getSpriteFrame(path);
            if (sf) {
                this.sp_icon.spriteFrame = sf;
            }
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
