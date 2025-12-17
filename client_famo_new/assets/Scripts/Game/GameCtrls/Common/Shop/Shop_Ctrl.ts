import GridListView from "../../../../Framework/Engine/GridListView";
import EventMgr from "../../../../Framework/Managers/EventMgr";
import { ResMgrAsync } from "../../../../Framework/Managers/ResMgrAsync";
import UIBase from "../../../../Framework/Managers/UIBase";
import CocosUtils from "../../../../Framework/Utils/CocosUtils";
import DebugUtils from "../../../../Framework/Utils/DebugUtils";
import { EventKey } from "../../../Config/EventCfg";
import { AbNames, UICfg } from "../../../Config/GameConfig";
import {
  GameMallProductResp,
  MallItem,
  PageResponseGameMallProductResp,
} from "../../../Config/MsgCfg";
import { ResCfg } from "../../../Config/ResConfig";
import NetHttpMgr from "../../../Data/NetHttpMgr";
import GameLogic from "../../../GameLogic";
import ShopItem_Ctrl from "./ShopItem_Ctrl";

const { ccclass, property } = cc._decorator;
/**
 * 伐魔商城
 */
@ccclass
export default class Shop_Ctrl extends UIBase {
  infoList: MallItem[][];
  list: GridListView;
  scrollview: cc.ScrollView;
  pre: cc.Prefab;
  labPMQ: cc.Label;
  startPage: number = 1; //起始页

  onLoad() {
    DebugUtils.Log("==============Shop_Ctrl.onLoad============");
    super.onLoad();
    this.initUI();
    this.updatePMQ();
    EventMgr.Instance.AddEventListener(
      EventKey.Update_ExorcismVoucher,
      this,
      this.updatePMQ
    );
    EventMgr.Instance.AddEventListener(
      EventKey.Http_Res_GetShopList,
      this,
      this.onListDataRes
    );
  }

  protected onDestroy(): void {
    EventMgr.Instance.RemoveListenner(
      EventKey.Update_ExorcismVoucher,
      this,
      this.updatePMQ
    ); //更新破魔券
    EventMgr.Instance.RemoveListenner(
      EventKey.Http_Res_GetShopList,
      this,
      this.onListDataRes
    );
  }

  async start() {
    this.initData();
    this.getListData();
  }

  initData() {
    console.log("==============Shop_Ctrl.initData=================");
  }

  private initUI() {
    this.AddButtonListener("node/bg/btn_close", this, this.onCloseBtn);
    this.AddButtonListener("node/bg/item_bg/btn_add", this, this.onBtnAddClick);

    this.labPMQ = this.ViewComponent(
      "node/bg/item_bg/lab",
      cc.Label
    ) as cc.Label;

    this.scrollview = this.ViewComponent(
      "node/bg/shop_bg1/scrollView",
      cc.ScrollView
    ) as cc.ScrollView;
    this.scrollview.node.on("scroll-to-bottom", this.onScrollToBottom, this);
  }

  private getListData() {
    console.log("==============Shop_Ctrl.getListData=================");
    let arr = [2, 3];
    let des = arr.join(",");
    NetHttpMgr.Instance.GetShopList(this.startPage, 9, des, 1);
  }

  private onListDataRes(
    uname: string,
    udata: PageResponseGameMallProductResp
  ): void {
    DebugUtils.Log("==============Shop_Ctrl.onListDataRes============", udata);
    if (udata) {
      let list = udata.list;
      if (list.length > 0) {
        this.setListData(list);
        this.startPage++;
      }
    }
  }

  private onScrollToBottom() {
    // DebugUtils.Log("ScrollView 已滚动到底部");
    // 在这里添加你的业务逻辑，例如加载更多数据
    this.getListData();
  }

  // 点击加号
  private onBtnAddClick(): void {
    EventMgr.Instance.Emit(EventKey.UI_ShowShopMoney, "");
  }

  private async setListData(list: GameMallProductResp[]) {
    this.pre = (await ResMgrAsync.Instance.IE_GetAsset(AbNames.Prefabs, ResCfg.Prefabs.ShopItem, cc.Prefab)) as cc.Prefab;
    for (let i = 0; i < list.length; i++) {
      let temp: GameMallProductResp = list[i];
      let itme = cc.instantiate(this.pre);
      let com = itme.addComponent(ShopItem_Ctrl);
      this.scrollview.content.addChild(itme);
      com.setData(temp);
    }
  }

  // 更新破魔券
  private updatePMQ() {
    let ex = GameLogic.Instance.getExorcismVoucher();
    let des = CocosUtils.formatNum(ex, 0);
    this.labPMQ.string = des;
  }
}
