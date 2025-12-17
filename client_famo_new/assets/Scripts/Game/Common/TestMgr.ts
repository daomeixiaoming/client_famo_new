import EventMgr from "../../Framework/Managers/EventMgr";
import UIMgr from "../../Framework/Managers/UIMgr";
import { protoGame } from "../../Proto/game";
import { EventKey } from "../Config/EventCfg";
import { AbNames, UICfg } from "../Config/GameConfig";
import Shop_Ctrl from "../GameCtrls/Common/Shop/Shop_Ctrl";
import ShopMoney_Ctrl from "../GameCtrls/Common/ShopMoney/ShopMoney_Ctrl";


const { ccclass, property } = cc._decorator;
/**
 * 测试数据
 */
@ccclass
export default class TestMgr extends cc.Component {
    onLoad() {
        EventMgr.Instance.AddEventListener(EventKey.TEST_ShopMoney, this, this.onTestShopMoney);
        EventMgr.Instance.AddEventListener(EventKey.TEST_Shop, this, this.onTestShop);
    }

    start() {

    }

    protected onDestroy(): void {
        EventMgr.Instance.RemoveListenner(EventKey.TEST_ShopMoney, this, this.onTestShopMoney);
        EventMgr.Instance.RemoveListenner(EventKey.TEST_Shop, this, this.onTestShop);
    }

    private onTestShopMoney(eventName: string, udata: any): void {
        // let com = UIMgr.Instance.ShowUIView(UICfg.ShopMoney, AbNames.Prefabs) as ShopMoney_Ctrl;
        // let data = udata.giftList;
        // com.setData(data);
    }

    private onTestShop(eventName: string, udata: any): void {
        // let com = UIMgr.Instance.ShowUIView(UICfg.Shop, AbNames.Prefabs) as Shop_Ctrl;
        // let data = udata.giftList;
        // com.setData(data);
    }
}
