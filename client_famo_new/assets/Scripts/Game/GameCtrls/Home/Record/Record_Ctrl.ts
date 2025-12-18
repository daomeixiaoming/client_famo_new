import GridListView from "../../../../Framework/Engine/GridListView";
import EventMgr from "../../../../Framework/Managers/EventMgr";
import { ResMgr } from "../../../../Framework/Managers/ResMgr";
import { ResMgrAsync } from "../../../../Framework/Managers/ResMgrAsync";
import UIBase from "../../../../Framework/Managers/UIBase";
import GameUtils from "../../../../Framework/Utils/GameUtils";
import { EventKey } from "../../../Config/EventCfg";
import { AbNames, Lngs, UICfg } from "../../../Config/GameConfig";
import {
  PageResultRewardHistoryItem,
  RewardHistoryItem,
} from "../../../Config/MsgCfg";
import { GuiCfg, ResCfg } from "../../../Config/ResConfig";
import NetHttpMgr from "../../../Data/NetHttpMgr";
import RecordItem_Ctrl from "./RecordItem_Ctrl";

const { ccclass, property } = cc._decorator;

/**
 * 中奖记录
 */
@ccclass
export default class Record_Ctrl extends UIBase {
  list: GridListView;
  infoList: any = [];
  nanNode: cc.Node;
  scrollview: cc.ScrollView;
  pre: cc.Prefab;

  startPage: number = 1; //起始页

  onLoad() {
    super.onLoad();
    this.initUI();
    EventMgr.Instance.AddEventListener(EventKey.Http_Res_GetRecordList, this, this.onGetRecordListRes);
  }

  protected async start() {
    // 更新按钮状态，防止狂点
    EventMgr.Instance.Emit(EventKey.UI_UpadteBtnStatus, "");
    this.getListData();
  }

  protected onDestroy(): void {
    EventMgr.Instance.RemoveListenner(EventKey.Http_Res_GetRecordList, this, this.onGetRecordListRes);
  }

  private async initUI() {
    let spBg = this.ViewComponent("node/bg", cc.Sprite) as cc.Sprite;
    GameUtils.SetSpTexture(AbNames.Gui, GuiCfg.record_bg, spBg);

    this.AddButtonListener("node/bg/sp_title/btn_close", this, this.onCloseBtn);

    this.nanNode = this.view["node/bg/bg2"] as cc.Node;

    this.scrollview = this.ViewComponent("node/bg/scrollView", cc.ScrollView) as cc.ScrollView;

    this.scrollview.node.on("scroll-to-bottom", this.onScrollToBottom, this);
  }

  private async setListData(list: RewardHistoryItem[]) {
    this.pre = (await ResMgrAsync.Instance.IE_GetAsset(
      AbNames.Prefabs,
      ResCfg.Prefabs.RecordItem,
      cc.Prefab
    )) as cc.Prefab;
    for (let i = 0; i < list.length; i++) {
      let temp: RewardHistoryItem = list[i];
      let itme = cc.instantiate(this.pre);
      let com = itme.addComponent(RecordItem_Ctrl);
      this.scrollview.content.addChild(itme);
      com.setData(temp, i);
    }
  }

  private onScrollToBottom() {
    this.getListData();
  }

  // 请求记录数据
  private getListData() {
    NetHttpMgr.Instance.GetRecordList(this.startPage, 8);
  }

  // 请求记录数据返回
  private async onGetRecordListRes(
    uname: string,
    udata: PageResultRewardHistoryItem
  ) {
    if (udata) {
      let list = udata.list;
      // list.length = 0; //测试

      //无数据节点
      if (this.startPage === 1 && list.length <= 0) {
        this.nanNode.destroyAllChildren();
        let preNan = (await ResMgrAsync.Instance.IE_GetAsset(
          AbNames.Prefabs,
          ResCfg.Prefabs.NanItem,
          cc.Prefab
        )) as cc.Prefab;
        let item = cc.instantiate(preNan);
        this.nanNode.addChild(item);
        item.getComponentInChildren(cc.Label).string = Lngs.RewardDes1;
        return;
      }

      if (list.length > 0) {
        this.setListData(list);
        this.startPage++;
      }
    }
  }
}
