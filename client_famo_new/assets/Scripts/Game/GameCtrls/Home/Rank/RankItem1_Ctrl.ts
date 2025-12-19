import { ResMgr } from "../../../../Framework/Managers/ResMgr";
import { ResMgrAsync } from "../../../../Framework/Managers/ResMgrAsync";
import UIBase from "../../../../Framework/Managers/UIBase";
import CocosUtils from "../../../../Framework/Utils/CocosUtils";
import DebugUtils from "../../../../Framework/Utils/DebugUtils";
import GameUtils from "../../../../Framework/Utils/GameUtils";
import { AbNames, Atals1Cfg, AtalsCfg } from "../../../Config/GameConfig";
import { RankItem, UserLabelResponse } from "../../../Config/MsgCfg";
import GameLogic from "../../../GameLogic";

const { ccclass, property } = cc._decorator;

/**
 * 昨天今天记录
 */
@ccclass
export default class RankItem1_Ctrl extends UIBase {
  sp_lv: cc.Sprite;
  lab_lv: cc.Label;
  lab_name: cc.Label;
  lab_score: cc.Label; //伤害值
  sp_bg: cc.Sprite;
  spItem: cc.Node;
  scrollView: cc.ScrollView;
  isExit: boolean = false;
  private _isLoaded: boolean = false;

  onLoad() {
    this._applyData();
    this._isLoaded = true;
  }

  private _applyData() {
    super.onLoad();
    this.initUI();
  }

  protected onDestroy(): void {
    DebugUtils.Log("==========RankItem1_Ctrl.onDestroy============");
    this.isExit = true;
  }

  private initUI(): void {
    this.sp_bg = this.ViewComponent("sp_bg", cc.Sprite) as cc.Sprite;
    this.sp_lv = this.ViewComponent("sp_lv", cc.Sprite) as cc.Sprite;
    this.lab_lv = this.ViewComponent("lab_lv", cc.Label) as cc.Label;
    this.lab_name = this.ViewComponent("layout/lab_name", cc.Label) as cc.Label;
    this.lab_score = this.ViewComponent(
      "layout2/lab_score",
      cc.Label
    ) as cc.Label;

    // 标签节点
    this.spItem = this.view["layout/scrollView/view/Item"] as cc.Node;
    this.spItem.active = false;
    this.scrollView = this.ViewComponent(
      "layout/scrollView",
      cc.ScrollView
    ) as cc.ScrollView;
  }

  public setData(data: RankItem, pos: number): void {
    // DebugUtils.Log("==========setData1111============", pos);
    if (!this._isLoaded) {
      this._applyData();
    }
    let rank = data.ranking;
    if (pos < 3) {
      this.sp_lv.node.active = true;
      this.lab_lv.node.active = false;
    } else {
      this.sp_lv.node.active = false;
      this.lab_lv.node.active = true;
    }

    this.lab_lv.string = rank.toString();
    let path = `rank_lv${pos + 1}`;
    GameUtils.SetSpData(AbNames.Atals1, Atals1Cfg.Rank, path, this.sp_lv);

    let name = data.nickname;
    this.lab_name.string = name;
    this.lab_score.string = this.formatNum(data.value, 1);

    let arr = ["rank_itembg0", "rank_itembg1", "rank_itembg2"];
    path = "rank_itembg_other";
    if (pos < 3) {
      path = arr[pos];
    } else {
      // 自己
      let myUid = GameLogic.Instance.userId;
      if (myUid === data.userId) {
        path = "rank_itembg_my";
      }
    }
    GameUtils.SetSpData(AbNames.Atals1, Atals1Cfg.Rank, path, this.sp_bg);

    let list: UserLabelResponse[] = data.userLabelList;

    // 测试数据
    // let b1 = {
    //   type: 3,
    //   level: 1,
    //   labelImg:
    //     "https://oss.liveboxs.live/liveboxs/admin/other/Property%201%3DVIP11753960789344.png",
    //   labelName: null,
    //   wide: 42,
    //   high: 18,
    // };
    // list.push(b1);
    // let b2 = {
    //   type: 1,
    //   level: 8,
    //   labelImg: "https://oss.liveboxs.live/admin/other/81754585266799.png",
    //   labelName: null,
    //   wide: 30,
    //   high: 18,
    // };
    // list.push(b2);

    this.scrollView.content.destroyAllChildren();
    for (let i = 0; i < list.length; i++) {
      let temp: UserLabelResponse = list[i];
      let item = cc.instantiate(this.spItem);
      item.active = true;

      this.scrollView.content.addChild(item);
      CocosUtils.loadRemoteSprite(
        temp.labelImg,
        item.getComponent(cc.Sprite),
        () => {
          //   DebugUtils.Log("==========RankItem1_Ctrl.item============", item);
          if (!this.isExit && item) {
            let item_size = item.getContentSize();
            let pre = 0.7;
            if (item_size) {
              item.setContentSize(
                item_size.width * pre,
                item_size.height * pre
              );
            }
          }
        }
      );
    }
    this.scrollView.scrollToLeft();
  }

  private formatNum(num: number, fixed: number) {
    let des = "";
    if (num < 10000000) {
      return num.toString();
    } else {
      let formattedNum = (num / 10000000).toFixed(fixed);
      des = `${formattedNum}kw`;
    }
    return des;
  }
}
