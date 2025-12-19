import UIBase from "../../../../Framework/Managers/UIBase";
import DebugUtils from "../../../../Framework/Utils/DebugUtils";
import { BoxConfigItem, BoxGiftConfigItem } from "../../../Config/MsgCfg";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RewardPriceItem_Ctrl extends UIBase {
  lab_name: cc.Label;
  item_r: cc.Node;
  layout_r: cc.Node;
  node_l: cc.Node;
  widget_r: cc.Widget;
  private _isLoaded: boolean = false;
  onLoad() {
    DebugUtils.Log("=============RewardPriceItem_Ctrl.onLoad==============");
    this._applyData();
    this._isLoaded = true;
  }

  private _applyData() {
    super.onLoad();
    this.initUI();
  }

  start() { }

  private initUI() {
    this.lab_name = this.ViewComponent("layout/left/lab", cc.Label) as cc.Label;
    this.item_r = this.view["layout/right/itemr"] as cc.Node;
    let path = "layout/right";
    this.layout_r = this.view[path] as cc.Node;
    this.node_l = this.view["layout/left"] as cc.Node;
    this.widget_r = this.ViewComponent(path, cc.Widget) as cc.Widget;
  }

  private setItemData(item: cc.Node, data: BoxGiftConfigItem) {
    let lab_giftname = cc.find("name/lab", item).getComponent(cc.Label);
    let lab_percent = cc.find("percent/lab", item).getComponent(cc.Label);
    let lab_price = cc.find("price/lab", item).getComponent(cc.Label);
    lab_giftname.string = data.giftName;
    lab_percent.string = `${data.percent}%`;
    lab_price.string = data.giftPrice.toString();
  }

  public setData(data: BoxConfigItem) {
    if (!this._isLoaded) {
      this._applyData();
    }
    DebugUtils.Log("=============RewardPriceItem_Ctrl.setData==============", data);
    let boxName = data.boxName || "";
    if (boxName) {
      this.lab_name.string = boxName;
    }
    let list = data.gifts;

    let test = [20, 30, 50];
    for (let i = 0; i < list.length; i++) {
      let gift: BoxGiftConfigItem = list[i];
      gift.percent = test[i];
      if (i === 0) {
        this.setItemData(this.item_r, gift);
      } else {
        let item = cc.instantiate(this.item_r);
        this.setItemData(item, gift);
        this.layout_r.addChild(item);
      }
    }

    this.widget_r.updateAlignment();
    let h = this.layout_r.getContentSize().height;

    let itemSize = this.item_r.getContentSize();
    this.view["layout"].height = itemSize.height * list.length;
    this.node.height = itemSize.height * list.length;
  }
}
