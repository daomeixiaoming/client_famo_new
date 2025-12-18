import GridListView from "../../../../Framework/Engine/GridListView";
import { ResMgrAsync } from "../../../../Framework/Managers/ResMgrAsync";
import UIBase from "../../../../Framework/Managers/UIBase";
import DebugUtils from "../../../../Framework/Utils/DebugUtils";
import GameUtils from "../../../../Framework/Utils/GameUtils";
import { AbNames, Lngs, UICfg } from "../../../Config/GameConfig";
import { BoxType, GiftItem } from "../../../Config/MsgCfg";
import { GuiCfg, ResCfg } from "../../../Config/ResConfig";
import EndGetBoxItem_Ctrl from "./EndGetBoxItem_Ctrl";

const { ccclass, property } = cc._decorator;
/**
 * 开完宝箱后获取奖励的奖励界面
 */
@ccclass
export default class EndGetBox_Ctrl extends UIBase {
  lab_des: cc.Label;
  lab_num: cc.Label;
  list: GridListView;
  infoList: GiftItem[][] = [];
  giftCom: EndGetBoxItem_Ctrl;
  scrollView: cc.ScrollView;
  pre: cc.Prefab;

  async onLoad() {
    super.onLoad();
    this.initUI();
  }

  start() {
    this.RunAnimation("node/bg");
  }

  private async initUI() {
    let spBg = this.ViewComponent("node/bg/sp_bg", cc.Sprite) as cc.Sprite;
    GameUtils.SetSpTexture(AbNames.Gui, GuiCfg.end_bg0, spBg);

    this.AddButtonListener("node/bg/sp_bg/btn_close", this, this.onCloseBtn);

    this.lab_des = this.ViewComponent("node/bg/sp_bg/labs/lab_des", cc.Label) as cc.Label;
    this.lab_num = this.ViewComponent("node/bg/sp_bg/labs/lab_num", cc.Label) as cc.Label;
    this.lab_num.string = "0";

    // 只有一个奖品时候的节点
    let giftOne = this.view["node/bg/sp_bg/EndGetBoxItem"] as cc.Node;
    giftOne.active = false;
    this.giftCom = giftOne.addComponent(EndGetBoxItem_Ctrl);
    DebugUtils.Log(
      "=================EndGetBox_Ctrl.initUI================",
      this.giftCom
    );
    this.scrollView = this.ViewComponent(
      "node/bg/sp_bg/scrollView",
      cc.ScrollView
    ) as cc.ScrollView;

    this.pre = (await ResMgrAsync.Instance.IE_GetAsset(AbNames.Prefabs, ResCfg.Prefabs.EndGetBoxItem, cc.Prefab)) as cc.Prefab;
  }

  /**
   *
   * @param udata 奖励列表
   * @param type 宝箱类型
   */
  public setData(udata: GiftItem[], type: number) {
    let listInffo = GameUtils.DeepClone(udata);
    DebugUtils.Log(
      "=================EndGetBox_Ctrl.setData================",
      listInffo
    );
    if (listInffo.length > 1) {
      let parent = this.scrollView.content;
      if (this.pre) {
        for (let i = 0; i < listInffo.length; i++) {
          const element = listInffo[i];
          let item = cc.instantiate(this.pre);
          let com = item.getComponent(EndGetBoxItem_Ctrl);
          if (!com) {
            com = item.addComponent(EndGetBoxItem_Ctrl);
          }
          parent.addChild(item);
          com.setData(element);
        }
      } else {
        console.error("========this.pre==========", this.pre);
      }

      this.giftCom.node.active = false;
    } else {
      this.giftCom.node.active = true;
      this.giftCom.setData(udata[0]);
    }

    // 设置宝箱类型
    let des = "";
    switch (type) {
      case BoxType.Box_BY:
        des = Lngs.GetBoxDes1;
        break;
      case BoxType.Box_HJ:
        des = Lngs.GetBoxDes2;
        break;
      case BoxType.Box_ZS:
        des = Lngs.GetBoxDes3;
        break;
      default:
        break;
    }
    this.lab_des.string = des;
    // 设置总价值
    let total = 0;
    for (let i = 0; i < udata.length; i++) {
      let temp = udata[i];
      total += temp.giftPrice * temp.num;
    }
    this.lab_num.string = total.toString();
  }
}
