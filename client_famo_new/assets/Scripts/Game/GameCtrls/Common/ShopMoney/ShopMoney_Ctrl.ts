import GridListView from "../../../../Framework/Engine/GridListView";
import EventMgr from "../../../../Framework/Managers/EventMgr";
import { ResMgrAsync } from "../../../../Framework/Managers/ResMgrAsync";
import UIBase from "../../../../Framework/Managers/UIBase";
import CocosUtils from "../../../../Framework/Utils/CocosUtils";
import DebugUtils from "../../../../Framework/Utils/DebugUtils";
import GameUtils from "../../../../Framework/Utils/GameUtils";
import { EventKey } from "../../../Config/EventCfg";
import { AbNames, UICfg } from "../../../Config/GameConfig";
import { GameMallProductResp, MallItem, PageResponseGameMallProductResp } from "../../../Config/MsgCfg";
import { GuiCfg, ResCfg } from "../../../Config/ResConfig";
import NativeMgr from "../../../Data/NativeMgr";
import NetHttpMgr from "../../../Data/NetHttpMgr";
import GameLogic from "../../../GameLogic";
import ShopMoneyItem_Ctrl from "./ShopMoneyItem_Ctrl";

const { ccclass, property } = cc._decorator;
/**
 * 破魔券商城
 */
@ccclass
export default class ShopMoney_Ctrl extends UIBase {
    list: GridListView;
    infoList: MallItem[] = [];
    scrollview: cc.ScrollView;
    pre: cc.Prefab;
    labJB: cc.Label;

    startPage: number = 1; //起始页

    onLoad() {
        super.onLoad();
        this.initUI();
        this.updateJB();

        EventMgr.Instance.AddEventListener(EventKey.Update_Currency, this, this.updateJB);
        EventMgr.Instance.AddEventListener(EventKey.Http_Res_GetShopMoneyList, this, this.onListDataRes);
    }

    async start() {
        this.getListData();
        this.RunAnimation("node/bg");
    }

    protected onDestroy(): void {
        EventMgr.Instance.RemoveListenner(EventKey.Update_Currency, this, this.updateJB);
        EventMgr.Instance.RemoveListenner(EventKey.Http_Res_GetShopMoneyList, this, this.onListDataRes);
    }

    private getListData() {
        NetHttpMgr.Instance.GetShopList(this.startPage, 6, "1", 2);
    }

    private onListDataRes(uname: string, udata: PageResponseGameMallProductResp): void {
        DebugUtils.Log("==============ShopMoney_Ctrl.onListDataRes============", udata);
        if (udata) {
            let list = udata.list;
            if (list.length > 0) {
                this.setListData(list);
                this.startPage++;
            }
        }
    }

    private initUI() {
        let spBg = this.ViewComponent("node/bg/bg_3", cc.Sprite) as cc.Sprite;
        GameUtils.SetSpTexture(AbNames.Gui, GuiCfg.shop_bg, spBg);

        this.AddButtonListener("node/bg/btn_close", this, this.onCloseBtn);
        this.AddButtonListener("node/bg/item_bg/btn_add", this, this.onAddCoinClick);

        // 金币
        this.labJB = this.ViewComponent("node/bg/item_bg/lab", cc.Label) as cc.Label;

        this.scrollview = this.ViewComponent("node/bg/scrollView", cc.ScrollView) as cc.ScrollView;
        this.scrollview.node.on('scroll-to-bottom', this.onScrollToBottom, this);
    }

    private onScrollToBottom() {
        // DebugUtils.Log("ScrollView 已滚动到底部");
        // 在这里添加你的业务逻辑，例如加载更多数据
        this.getListData();
    }

    // 点击
    private onAddCoinClick(): void {
        NativeMgr.Instance.gotoShop();
    }

    private async setListData(list: GameMallProductResp[]) {
        this.pre = await ResMgrAsync.Instance.IE_GetAsset(AbNames.Prefabs, ResCfg.Prefabs.ShopMoneyItem, cc.Prefab) as cc.Prefab;
        for (let i = 0; i < list.length; i++) {
            let temp: GameMallProductResp = list[i];
            let itme = cc.instantiate(this.pre);
            let com = itme.addComponent(ShopMoneyItem_Ctrl);
            this.scrollview.content.addChild(itme);
            com.setData(temp);
        }
    }

    // 更新金币
    private updateJB() {
        let num = GameLogic.Instance.getCurrency();
        // num = 1000000000; //测试
        let des = CocosUtils.formatNum(num, 0);
        this.labJB.string = des;
    }
}
