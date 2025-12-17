import EventMgr from "../../../../Framework/Managers/EventMgr";
import SoundMgr from "../../../../Framework/Managers/SoundMgr";
import UIBase from "../../../../Framework/Managers/UIBase";
import CocosUtils from "../../../../Framework/Utils/CocosUtils";
import DebugUtils from "../../../../Framework/Utils/DebugUtils";
import { EventKey } from "../../../Config/EventCfg";
import GameApp from "../../../GameApp";
import GameLogic from "../../../GameLogic";


const { ccclass, property } = cc._decorator;
/**
 * 首页
 */
@ccclass
export default class Login_Ctrl extends UIBase {
    btn_start: cc.Button;
    mask: cc.Node; //遮罩节点，带点击事件
    labPMQ: cc.Label; //破魔券节点
    btnShopMoney: cc.Button; //破魔券商城
    btnShop: cc.Button;  //
    onLoad() {
        super.onLoad();
        this.initUI();
        this.registerEvent();
    }

    protected start(): void {
        this.updatePMQ();
    }

    private initUI(): void {
        this.AddButtonListener("node/btn_shop", this, this.onBtnShopClick);
        this.AddButtonListener("node/item_bg/btn_add", this, this.onBtnShopMoneyClick);
        this.AddButtonListener("node/btn_start", this, this.onBtnStartClick);
        this.AddButtonListener("node/btn_close", this, this.onBtnBackClick);
        this.AddButtonListener("mask", this, this.onBtnBackClick);

        this.btn_start = this.ViewComponent("node/btn_start", cc.Button) as cc.Button;
        this.btnShop = this.ViewComponent("node/btn_shop", cc.Button) as cc.Button;
        this.btnShopMoney = this.ViewComponent("node/item_bg/btn_add", cc.Button) as cc.Button;

        this.mask = this.view["node/mask"] as cc.Node;
        this.setMaskActive(true);
        //点击触摸事件
        // this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);

        this.labPMQ = this.ViewComponent("node/item_bg/lab", cc.Label) as cc.Label;
    }

    protected onDestroy(): void {
        this.unRegisterEvent();
    }

    private registerEvent() {
        EventMgr.Instance.AddEventListener(EventKey.UI_Notice_True, this, this.onUINoticeTrue); //玩法点击同意
        EventMgr.Instance.AddEventListener(EventKey.Update_ExorcismVoucher, this, this.updatePMQ);
        EventMgr.Instance.AddEventListener(EventKey.UI_ShowLogin, this, this.onUIShowLogin);
        EventMgr.Instance.AddEventListener(EventKey.Http_Res_GetShopMoneyList, this, this.onShopMoneyListRes);//破魔券商城
        EventMgr.Instance.AddEventListener(EventKey.Http_Res_GetShopList, this, this.onShopListRes); //伐魔商城
    }

    private unRegisterEvent() {
        EventMgr.Instance.RemoveListenner(EventKey.UI_Notice_True, this, this.onUINoticeTrue); //玩法点击同意
        EventMgr.Instance.RemoveListenner(EventKey.Update_ExorcismVoucher, this, this.updatePMQ);
        EventMgr.Instance.RemoveListenner(EventKey.UI_ShowLogin, this, this.onUIShowLogin);
        EventMgr.Instance.RemoveListenner(EventKey.Http_Res_GetShopMoneyList, this, this.onShopMoneyListRes);//破魔券商城
        EventMgr.Instance.RemoveListenner(EventKey.Http_Res_GetShopList, this, this.onShopListRes); //伐魔商城
    }

    // 更新破魔券
    private updatePMQ() {
        let ex = GameLogic.Instance.getExorcismVoucher();
        let des = CocosUtils.formatNum(ex, 0);
        this.labPMQ.string = des;
    }

    // 兑换商城
    private onBtnShopClick(button: cc.Button): void {
        button.interactable = false;
        EventMgr.Instance.Emit(EventKey.UI_ShowShop, "");
        this.btnShop = button;
    }

    // 伏魔券商城
    private onBtnShopMoneyClick(button: cc.Button): void {
        button.interactable = false;
        EventMgr.Instance.Emit(EventKey.UI_ShowShopMoney, "");
        this.btnShopMoney = button;
    }

    // 点击开始游戏
    private onBtnStartClick(button: cc.Button): void {
        DebugUtils.Log("====================Login_Ctrl.onBtnStartClick=================");
        button.interactable = false;
        SoundMgr.Instance.playSound(this.audioClip_btn);
        // 打开主场景UI
        EventMgr.Instance.Emit(EventKey.UI_EnterGame, "");
    }

    // 点击返回直播间
    private onBtnBackClick(): void {
        GameApp.Instance.onExitGame();
    }

    // 触摸事件
    private onTouchStart(touch: cc.Event.EventTouch): void {
        let screenPos = touch.getLocation();
        DebugUtils.Log("============Login_onTouchStart==============", screenPos.y);
        if (screenPos.y <= 1500) {
            let worldPos = new cc.Vec3(screenPos.x, screenPos.y, 0);
            let targetPos = this.node.convertToNodeSpaceAR(worldPos);
            EventMgr.Instance.Emit(EventKey.UI_ClickAni, targetPos);
        }
        return;
    }

    private onUINoticeTrue(uname: string, udata: any): void {
        this.setMaskActive(false);
    }

    // 遮罩可以隐藏了
    private onUIShowLogin(uname: string, udata: any): void {
        this.setMaskActive(false);
    }

    // 破魔券商城返回
    private onShopMoneyListRes(uname: string, udata: any) {
        if (this.btnShopMoney) {
            this.btnShopMoney.interactable = true;
        }
    }

    // 伐魔商城返回
    private onShopListRes(uname: string, udata: any) {
        if (this.btnShop) {
            this.btnShop.interactable = true;
        }
    }

    public setMaskActive(active: boolean): void {
        if (this.mask) {
            this.mask.active = active;
        }
    }
}
