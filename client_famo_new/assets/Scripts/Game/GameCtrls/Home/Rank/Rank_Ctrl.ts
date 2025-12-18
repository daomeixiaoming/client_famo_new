import GridListView from "../../../../Framework/Engine/GridListView";
import EventMgr from "../../../../Framework/Managers/EventMgr";
import { ResMgrAsync } from "../../../../Framework/Managers/ResMgrAsync";
import UIBase from "../../../../Framework/Managers/UIBase";
import UIMgr, { UILayer } from "../../../../Framework/Managers/UIMgr";
import DebugUtils from "../../../../Framework/Utils/DebugUtils";
import GameUtils from "../../../../Framework/Utils/GameUtils";
import { EventKey } from "../../../Config/EventCfg";
import { AbNames, Lngs } from "../../../Config/GameConfig";
import { GuiCfg, ResCfg } from "../../../Config/ResConfig";
const { ccclass, property } = cc._decorator;

/**
 * 排行榜
 */
@ccclass
export default class Rank_Ctrl extends UIBase {
  scrollView1: cc.Node; // 今天记录的节点
  scrollView2: cc.Node; //昨天记录节点
  scrollView3: cc.Node; //昨天记录节点
  togContainer: cc.ToggleContainer;
  list1: GridListView;
  list2: GridListView;
  list3: GridListView;
  list4: GridListView;
  list: any;
  infoList1: any = [];
  infoList2: any = [];
  nanNode: cc.Node;
  page: cc.Node;

  onLoad() {
    super.onLoad();
    this.initUI();
    this.initData();
    this.registerEvent();
  }

  protected start(): void {
    // 更新按钮状态，防止狂点
    EventMgr.Instance.Emit(EventKey.UI_UpadteBtnStatus, "");
  }

  protected onDestroy(): void {
    this.unRegisterEvent();
  }

  private async initUI() {
    let spBg = this.ViewComponent("node/bg", cc.Sprite) as cc.Sprite;
    GameUtils.SetSpTexture(AbNames.Gui, GuiCfg.record_bg, spBg);

    this.AddButtonListener("node/bg/sp_title/btn_close", this, this.onCloseBtn);

    this.page = this.view["node/bg/pages"] as cc.Node;
    this.showView(0);

    //无数据节点
    let temp = this.view["node/bg/bg2/icon"] as cc.Node;
    temp.destroyAllChildren();
    let preNan = (await ResMgrAsync.Instance.IE_GetAsset(
      AbNames.Prefabs,
      ResCfg.Prefabs.NanItem,
      cc.Prefab
    )) as cc.Prefab;
    this.nanNode = cc.instantiate(preNan);
    temp.addChild(this.nanNode);
    this.nanNode.active = false;
    this.nanNode.getComponentInChildren(cc.Label).string = Lngs.RankDes2;

    this.togContainer = this.ViewComponent("node/bg/toggleContainer", cc.ToggleContainer) as cc.ToggleContainer;
    this.togContainer.toggleItems.forEach(
      (toggle: cc.Toggle, index: number) => {
        toggle.node.on(
          "toggle",
          (targetToggle) => {
            this.onIndividualToggleChanged(targetToggle, index);
          },
          this
        );
      }
    );
  }

  private registerEvent(): void {
    EventMgr.Instance.AddEventListener(EventKey.UI_RankNanData, this, this.onNanStatus);
  }

  private unRegisterEvent(): void {
    EventMgr.Instance.RemoveListenner(EventKey.UI_RankNanData, this, this.onNanStatus);
  }

  private initData(): void { }

  private onIndividualToggleChanged(toggle: cc.Toggle, index: number) {
    toggle.interactable = false;
    this.scheduleOnce(() => {
      toggle.interactable = true;
    }, 0.5);
    // DebugUtils.Log(` onIndividualToggleChanged =第 ${index} 个 Toggle 状态变化，是否选中: ${toggle.isChecked}`);
    this.showView(index);
  }

  private onNanStatus(uname: string, udata: any): void {
    this.setNanActive(true);
  }

  private showView(idx: number): void {
    this.page.destroyAllChildren();
    this.setNanActive(false);
    if (idx === 0) {
      this.showView1();
    } else if (idx === 1) {
      this.showView2();
    }
  }

  //无数据节点
  private setNanActive(active: boolean): void {
    if (this.nanNode) {
      this.nanNode.active = active;
    }
  }

  // 显示今天
  private async showView1() {
    await UIMgr.Instance.ShowUIViewAsync(ResCfg.Prefabs.RankPage1, AbNames.Prefabs, this.page);
  }

  // 显示昨天
  private async showView2() {
    await UIMgr.Instance.ShowUIViewAsync(ResCfg.Prefabs.RankPage2, AbNames.Prefabs, this.page);
  }

  //获取今天的数据
  public setData1(data: any[], idx: number = 0) {
    if (idx === 0) {
      this.infoList1 = data;
    } else if (idx === 1) {
      this.infoList2 = data;
    }

    this.showView(idx);
  }
}
