import EventMgr from "../../../../Framework/Managers/EventMgr";
import { ResMgr } from "../../../../Framework/Managers/ResMgr";
import { ResMgrAsync } from "../../../../Framework/Managers/ResMgrAsync";
import UIBase from "../../../../Framework/Managers/UIBase";
import UIMgr from "../../../../Framework/Managers/UIMgr";
import DebugUtils from "../../../../Framework/Utils/DebugUtils";
import GameUtils from "../../../../Framework/Utils/GameUtils";
import { EventKey } from "../../../Config/EventCfg";
import { AbNames, Lngs } from "../../../Config/GameConfig";
import {
  BoxConfigItem,
  BoxType,
  RankRewardConfig,
  RewardResponse,
} from "../../../Config/MsgCfg";
import { GuiCfg, ResCfg } from "../../../Config/ResConfig";
import NetHttpMgr from "../../../Data/NetHttpMgr";
import GameLogic from "../../../GameLogic";
import RewardPriceItem_Ctrl from "./RewardPriceItem_Ctrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RewardPrice_Ctrl extends UIBase {
  scrollview: cc.ScrollView;
  sp_title: cc.Sprite;
  labDes: cc.Label;
  viewBg: cc.Node;
  cellItem: cc.Node;

  onLoad() {
    super.onLoad();
    this.initUI();
  }

  start() {
    NetHttpMgr.Instance.GeBoxCfg();
  }

  protected onDestroy(): void {
    EventMgr.Instance.RemoveListenner(EventKey.Http_Res_GetBoxConfig, this, this.onMsgGetBoxCfgRes);
  }

  private initUI() {
    this.viewBg = this.view["node/bg"] as cc.Node;
    this.viewBg.active = false;
    this.AddButtonListener("node/bg/sp_bg/btn_close", this, this.onCloseBtn);
    this.scrollview = this.ViewComponent("node/bg/sp_bg/girdBg/scrollView", cc.ScrollView) as cc.ScrollView;
    this.sp_title = this.ViewComponent("node/bg/sp_bg/sp_title", cc.Sprite) as cc.Sprite;
    this.labDes = this.ViewComponent("node/bg/sp_bg/girdBg/scrollView/view/content/des/lab", cc.Label) as cc.Label;

    this.cellItem = this.view["node/bg/sp_bg/ItemCell"] as cc.Node;
    this.cellItem.active = false;
    // 注册事件
    EventMgr.Instance.AddEventListener(EventKey.Http_Res_GetBoxConfig, this, this.onMsgGetBoxCfgRes);
    // 背景
    let bg = this.ViewComponent("node/bg/sp_bg/bg", cc.Sprite) as cc.Sprite;
    GameUtils.SetSpTexture(AbNames.Gui, GuiCfg.rewardPrice_bg, bg);
  }

  private onMsgGetBoxCfgRes(uanme: string, udata: BoxConfigItem[]) {
    DebugUtils.Log(
      "=============RewardPrice_Ctrl.onMsgGetBoxCfgRes=============="
    );
    if (!udata) {
      this.node.destroy();
      return;
    }
    this.viewBg.active = true;
    this.RunAnimation("node/bg");
    let list = udata;
    for (let i = 0; i < list.length; i++) {
      let item = cc.instantiate(this.cellItem);
      item.active = true;
      let com = item.addComponent(RewardPriceItem_Ctrl);
      this.scrollview.content.addChild(item);
      com.setData(list[i]);
    }
    this.scrollview.scrollToTop();
  }

  public async setData(type: number) {
    let path = null;
    let top = 102;
    if (type === 1) {
      path = "rewardprice_title1";
    } else {
      path = "rewardprice_title2";
    }

    this.labDes.string = this.getDes();
  }

  private getDes() {
    let des = Lngs.RewardPriceDes;
    let data: RewardResponse = GameLogic.Instance.gameRates;
    let list = data.rankRewardConfigs;
    for (let i = 0; i < list.length; i++) {
      const ele: RankRewardConfig = list[i];

      let name = "";
      if (ele.type === BoxType.Box_BY) {
        name = "銀";
      } else if (ele.type === BoxType.Box_HJ) {
        name = "金";
      } else if (ele.type === BoxType.Box_ZS) {
        name = "鑽石";
      }
      des += `第${ele.minRank}名獎勵${name}寶箱X1;`;
    }
    return des;
  }
}
