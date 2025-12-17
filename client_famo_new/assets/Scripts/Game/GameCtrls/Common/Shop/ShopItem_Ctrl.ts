import UIBase from "../../../../Framework/Managers/UIBase";
import CocosUtils from "../../../../Framework/Utils/CocosUtils";
import GameUtils from "../../../../Framework/Utils/GameUtils";
import { Lngs } from "../../../Config/GameConfig";
import { GameMallProductResp, MallItem } from "../../../Config/MsgCfg";
import GameLogic from "../../../GameLogic";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShopItem_Ctrl extends UIBase {
    lab_name: cc.Label;
    lab_num: cc.Label;
    wid: cc.Widget;
    sp_icon: cc.Sprite;
    data: GameMallProductResp = {};

    onLoad() {
        super.onLoad();
        this.initUI();
    }

    start() {

    }

    private initUI(): void {
        this.lab_name = this.ViewComponent("lab_name", cc.Label) as cc.Label;
        this.lab_num = this.ViewComponent("sp_item/lab", cc.Label) as cc.Label;
        this.sp_icon = this.ViewComponent("sp_icon/spIcon", cc.Sprite) as cc.Sprite;

        this.wid = this.node.getComponent(cc.Widget) as cc.Widget;

        this.AddButtonListener("btn", this, this.onBtnDuiHuanClick);
    }

    public setData(udata: GameMallProductResp): void {
        // DebugUtils.Log("==============ShopItem_Ctrl setData======================", udata);

        this.data = GameUtils.DeepClone(udata);

        this.lab_name.string = udata.name;
        this.lab_num.string = udata.price.toString();

        // 图标
        let img = udata.icon;
        if (img) {
            CocosUtils.loadRemoteSprite(img, this.sp_icon, () => {
                if (this.sp_icon) {
                    let item = this.sp_icon.node;
                    let item_size = item.getContentSize();
                    let parent_size = this.sp_icon.node.parent.getContentSize();
                    item.scaleX = parent_size.width / item_size.width;
                    item.scaleY = parent_size.height / item_size.height;
                }
            });
            let wid = this.sp_icon.node.getComponent(cc.Widget);
            wid.updateAlignment();
        }
    }

    // 点击兑换
    private onBtnDuiHuanClick(button: cc.Button): void {
        button.interactable = false;
        setTimeout(() => {
            button.interactable = true; // 操作完成后重新启用按钮
        }, 500);
        if (this.data) {
            let price = this.data.price;
            let num = GameLogic.Instance.getExorcismVoucher();
            if (num >= price) {
                GameLogic.Instance.shopBuy(this.data.categoryId, this.data.id, 2);
            } else {
                CocosUtils.showToast(Lngs.ShopTip3, 2);
            }
        }
    }
}
