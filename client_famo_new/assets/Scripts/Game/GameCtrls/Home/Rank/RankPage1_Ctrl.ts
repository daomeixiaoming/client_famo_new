import GridListView from "../../../../Framework/Engine/GridListView";
import EventMgr from "../../../../Framework/Managers/EventMgr";
import { ResMgr } from "../../../../Framework/Managers/ResMgr";
import { ResMgrAsync } from "../../../../Framework/Managers/ResMgrAsync";
import UIBase from "../../../../Framework/Managers/UIBase";
import DebugUtils from "../../../../Framework/Utils/DebugUtils";
import { EventKey } from "../../../Config/EventCfg";
import { AbNames, UICfg } from "../../../Config/GameConfig";
import { ResCfg } from "../../../Config/ResConfig";
import NetHttpMgr from "../../../Data/NetHttpMgr";
import RankItem1_Ctrl from "./RankItem1_Ctrl";

const { ccclass, property } = cc._decorator;

/**
 * 今日榜
 */
@ccclass
export default class RankPage1_Ctrl extends UIBase {
  list: GridListView;
  infoList: any = [];
  onLoad() {
    DebugUtils.Log("===========RankPage1_Ctrl.onLoad=========");
    super.onLoad();

    this.registertEvent();
  }

  protected start(): void {
    this.initData();
  }

  protected onDestroy(): void {
    this.unRegistertEvent();
  }

  private registertEvent() {
    EventMgr.Instance.AddEventListener(
      EventKey.Http_Res_RankPage1,
      this,
      this.onRankListRes
    );
  }

  private unRegistertEvent() {
    EventMgr.Instance.RemoveListenner(
      EventKey.Http_Res_RankPage1,
      this,
      this.onRankListRes
    );
  }

  private async initUI() {
    // listView 动态列表
    let pre = (await ResMgrAsync.Instance.IE_GetAsset(
      AbNames.Prefabs,
      ResCfg.Prefabs.RankItem1,
      cc.Prefab
    )) as cc.Prefab;
    this.list = this.node.addComponent(GridListView) as GridListView;
    this.list.spaceY = 8;
    this.list.Prefab = pre;
    var clickEventHandler = new cc.Component.EventHandler();
    clickEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
    clickEventHandler.component = "RankPage1_Ctrl"; // 这个是代码文件名
    clickEventHandler.handler = "updateItem";
    clickEventHandler.customEventData = "foobar";
    this.list.delegate = clickEventHandler;
  }

  private initData() {
    DebugUtils.Log("===========RankPage2_Ctrl.initData1=========");
    //1今日 2昨日
    NetHttpMgr.Instance.GetRankList(1);
  }

  /**
   * 这个是使用GridListView 必须实现的更新
   * @param listView
   * @param pos
   * @param item
   */
  private updateItem(listView: GridListView, pos: number, item: cc.Node) {
    // cc.log(' ShopMoney_Ctrl updateItem_V pos ', pos)
    let data = this.infoList[pos];
    let comp =
      item.getComponent(RankItem1_Ctrl) || item.addComponent(RankItem1_Ctrl);
    if (comp) {
      comp.setData(data, pos);
    }
  }

  private async onRankListRes(uanme: string, udate: any) {
    DebugUtils.Log("===============onRankListRes===================", udate);
    await this.initUI();
    if (udate) {
      // udate.length = 0;
      this.infoList = udate;
      if (this.infoList.length === 0) {
        EventMgr.Instance.Emit(EventKey.UI_RankNanData, "");
      } else {
        this.infoList.sort((a, b) => a);
        this.scheduleOnce(() => {
          if (this.list) {
            this.list.reset(this.infoList.length);
          }
        });
      }
    }
  }
}
