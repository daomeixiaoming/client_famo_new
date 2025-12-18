import EventMgr from "../../../Framework/Managers/EventMgr";
import UIBase from "../../../Framework/Managers/UIBase";
import UIMgr, { UILayer } from "../../../Framework/Managers/UIMgr";
import { EventKey } from "../../Config/EventCfg";
import { AbNames } from "../../Config/GameConfig";
import { ResCfg } from "../../Config/ResConfig";
import GameLogic from "../../GameLogic";

const { ccclass, property } = cc._decorator;
/** 菜单页 */
@ccclass
export default class HomeMenu_Ctrl extends UIBase {
    onLoad() {
        super.onLoad();
        this.initUI();
    }

    start() {
        // 更新按钮状态，防止狂点
        EventMgr.Instance.Emit(EventKey.UI_UpadteBtnStatus, "");
    }

    private initUI() {
        console.log("===========initUI==============");
        this.AddButtonListener("mask", this, this.onCloseBtn);
        this.AddButtonListener("node/bg/spMenuBg/btn1", this, this.onShop1Click);
        this.AddButtonListener("node/bg/spMenuBg/btn2", this, this.onShop2Click);
        this.AddButtonListener("node/bg/spMenuBg/btn3", this, this.onShop3Click);
    }

    /** 冰钻商城 */
    private onShop1Click() {
        EventMgr.Instance.Emit(EventKey.UI_ShowShopMoney, "");
    }


    /** 兑换商城 */
    private onShop2Click() {
        let parent = UIMgr.Instance.GetParent(UILayer.UI_Layer2);
        UIMgr.Instance.ShowUIViewAsync(ResCfg.Prefabs.Shop, AbNames.Prefabs, parent);
    }


    /** 帮助说明 */
    private onShop3Click() {
        // 请求概率数据
        GameLogic.Instance.getGames().then(() => {
            let parent = UIMgr.Instance.GetParent(UILayer.UI_Layer2);
            UIMgr.Instance.ShowUIViewAsync(ResCfg.Prefabs.Help, AbNames.Prefabs, parent);
        });
    }
}
