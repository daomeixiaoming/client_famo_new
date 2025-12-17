import UIBase from "../../../../Framework/Managers/UIBase";
import CocosUtils from "../../../../Framework/Utils/CocosUtils";
import DebugUtils from "../../../../Framework/Utils/DebugUtils";
import { GiftItem } from "../../../Config/MsgCfg";

const { ccclass, property } = cc._decorator;
/**
 * 具体的奖励单个节点
 */
@ccclass
export default class EndGetBoxItem_Ctrl extends UIBase {
  sp_icon: cc.Sprite;
  lb_num: cc.Label;
  lab_name: cc.Label;
  lab_price: cc.Label;

  onLoad() {
    DebugUtils.Log("========EndGetBoxItem_Ctrl.onLoad===========");
    super.onLoad();
    this.initUI();
  }

  private initUI(): void {
    this.sp_icon = this.ViewComponent(
      "sp_bg/sp_icon/spIcon",
      cc.Sprite
    ) as cc.Sprite;
    this.lb_num = this.ViewComponent(
      "sp_bg/end_num_bg/lab",
      cc.Label
    ) as cc.Label;
    this.lab_name = this.ViewComponent("lab_name", cc.Label) as cc.Label;
    this.lab_price = this.ViewComponent("layout/lab", cc.Label) as cc.Label;
  }

  public setData(data: GiftItem): void {
    DebugUtils.Log("========EndGetBoxItem_Ctrl.setData===========", this.lab_name);
    if (!this.lab_name || !this.lb_num || !this.sp_icon) {
      this.initUI();
    }
    this.lab_name.string = data.giftName;
    this.lb_num.string = "x" + data.num.toString();
    let price = data.giftPrice * data.num;
    this.lab_price.string = price.toString();
    let img = data.image;
    CocosUtils.loadRemoteSprite(img, this.sp_icon, () => {
      if (this.sp_icon) {
        let item = this.sp_icon.node;
        let item_size = item.getContentSize();
        let parent_size = this.sp_icon.node.parent.getContentSize();
        item.scaleX = parent_size.width / item_size.width;
        item.scaleY = parent_size.height / item_size.height;
      }
    });
  }
}
