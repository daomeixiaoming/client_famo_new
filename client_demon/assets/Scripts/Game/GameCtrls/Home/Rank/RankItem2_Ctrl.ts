import EventMgr from "../../../../Framework/Managers/EventMgr";
import { ResMgr } from "../../../../Framework/Managers/ResMgr";
import UIBase from "../../../../Framework/Managers/UIBase";
import DebugUtils from "../../../../Framework/Utils/DebugUtils";
import { EventKey } from "../../../Config/EventCfg";
import { AbNames, AtalsCfg, Lngs } from "../../../Config/GameConfig";
import { BossHistoryItem, BoxType } from "../../../Config/MsgCfg";

const { ccclass, property } = cc._decorator;
// 伤害榜单元节点数据
@ccclass
export default class RankItem2_Ctrl extends UIBase {
  lab_time: cc.Label;
  sp_box: cc.Sprite;
  atals: cc.SpriteAtlas;

  id: number = 0;

  onLoad() {
    super.onLoad();
    this.initUI();
  }

  private initUI(): void {
    DebugUtils.Log("===============RankItem2.initUI================");
    this.AddButtonListener("btn", this, this.onBtnClick);

    this.lab_time = this.ViewComponent("lab_time", cc.Label) as cc.Label;
    this.sp_box = this.ViewComponent("sp_box", cc.Sprite) as cc.Sprite;

    this.atals = ResMgr.Instance.getAsset(
      AbNames.Atals_Home,
      AtalsCfg.Home,
      cc.SpriteAtlas
    ) as cc.SpriteAtlas;
  }

  public setData(data: BossHistoryItem): void {
    DebugUtils.Log("===============RankItem2 setData================", data);

    this.id = data.id;

    let time = data.time;
    if (time) {
      time = time.replace(/-/g, ".");
      let des = Lngs.RankDes1 || "";
      this.lab_time.string = des + time;
    }

    let type = data.type;
    if (type !== BoxType.Box_Nan) {
      //1为钻石宝箱，2为黄金宝箱，3为白银宝箱
      this.sp_box.node.active = true;
      let path = undefined;
      if (type === BoxType.Box_BY) {
        path = "rank_box3";
      } else if (type === BoxType.Box_HJ) {
        path = "rank_box2";
      } else if (type === BoxType.Box_ZS) {
        path = "rank_box1";
      }
      if (path) {
        let sf = this.atals.getSpriteFrame(path);
        if (sf) {
          this.sp_box.spriteFrame = sf;
        }
      }
    } else {
      this.sp_box.node.active = false;
    }
  }

  private onBtnClick(): void {
    EventMgr.Instance.Emit(EventKey.UI_RankShowDetial, this.id);
  }
}
