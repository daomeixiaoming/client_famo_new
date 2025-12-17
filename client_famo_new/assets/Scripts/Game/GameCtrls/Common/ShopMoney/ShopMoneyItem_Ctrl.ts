import UIBase from "../../../../Framework/Managers/UIBase";
import CocosUtils from "../../../../Framework/Utils/CocosUtils";
import DebugUtils from "../../../../Framework/Utils/DebugUtils";
import GameUtils from "../../../../Framework/Utils/GameUtils";
import { Lngs } from "../../../Config/GameConfig";
import { GameMallProductResp, MallItem } from "../../../Config/MsgCfg";
import NativeMgr from "../../../Data/NativeMgr";
import GameLogic from "../../../GameLogic";

const { ccclass, property } = cc._decorator;
//破魔券商城 单元
@ccclass
export default class ShopMoneyItem_Ctrl extends UIBase {
    guang: cc.Node; //光效
    sp_icom: cc.Sprite;
    lab_1: cc.Label;
    lab_name: cc.Label;
    lab_2: cc.Label;
    data: GameMallProductResp = {};

    onLoad() {
        super.onLoad();
        this.initUI();
    }

    private initUI(): void {
        this.guang = this.view["item_bg/sp_guang"] as cc.Node;
        // 商品图标
        this.sp_icom = this.ViewComponent("item_bg/sp_icon/spIcon", cc.Sprite) as cc.Sprite;
        // 购买的货币价格
        this.lab_1 = this.ViewComponent("btn/layout/lab", cc.Label) as cc.Label;
        // 商品名称
        this.lab_name = this.ViewComponent("lab_name", cc.Label) as cc.Label;
        // 破魔券价格
        this.lab_2 = this.ViewComponent("layout/lab", cc.Label) as cc.Label;

        this.AddButtonListener("btn", this, this.onBtnClick);
    }

    // 点击购买
    private onBtnClick(button: cc.Button): void {
        button.interactable = false;
        setTimeout(() => {
            button.interactable = true; // 操作完成后重新启用按钮
        }, 500);
        // DebugUtils.Log("=============ShopMoneyItem_Ctrl.onBtnClick 点击购买====================", this.data);
        if (this.data) {
            let price = this.data.price;
            let num = GameLogic.Instance.getCurrency();
            if (num >= price) {
                GameLogic.Instance.shopBuy(this.data.categoryId, this.data.id, 1);
            } else {
                // CocosUtils.showToast(Lngs.ShopTip4,2);
                NativeMgr.Instance.gotoShop();
            }
        }
    }

    public setData(udata: GameMallProductResp): void {
        this.data = GameUtils.DeepClone(udata);
        // DebugUtils.Log("======ShopMoneyItem_Ctrl.ShopMoneyData==========", udata);
        this.lab_name.string = udata.name + `*${1}${Lngs.One}`;
        this.lab_2.string = udata.price.toString();
        let des = this.formatNum(udata.price, 1);
        this.lab_1.string = des;

        // 商品图标
        let img = udata.icon;
        if (img) {
            CocosUtils.loadRemoteSprite(img, this.sp_icom, () => {
                if (this.sp_icom) {
                    let item = this.sp_icom.node;
                    let item_size = item.getContentSize();
                    let parent_size = this.sp_icom.node.parent.getContentSize();
                    item.scaleX = parent_size.width / item_size.width;
                    item.scaleY = parent_size.height / item_size.height;
                }
            });
        }
    }

    public formatNum(num: number, fixed: number = 2): string {
        // 参数校验
        if (typeof num !== 'number' || isNaN(num)) {
            return '0';
        }
        let des = "";
        if (num < 10000) {
            return num.toString();
        } else {
            let formattedNum = (num / 10000).toFixed(fixed);
            des = `${formattedNum}w`;
        }
        return des;
    }
}
