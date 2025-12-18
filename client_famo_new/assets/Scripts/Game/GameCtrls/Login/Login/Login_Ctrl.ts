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
    onLoad() {
        super.onLoad();
        this.initUI();
        this.registerEvent();
    }

    protected start(): void {

    }

    private initUI(): void {
        this.AddButtonListener("node/btn_start", this, this.onBtnStartClick);

        this.btn_start = this.ViewComponent("node/btn_start", cc.Button) as cc.Button;

        this.mask = this.view["node/mask"] as cc.Node;
        this.setMaskActive(true);
        //点击触摸事件
        // this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);

    }

    protected onDestroy(): void {
        this.unRegisterEvent();
    }

    private registerEvent() {
        EventMgr.Instance.AddEventListener(EventKey.UI_Notice_True, this, this.onUINoticeTrue); //玩法点击同意
        EventMgr.Instance.AddEventListener(EventKey.UI_ShowLogin, this, this.onUIShowLogin);
    }

    private unRegisterEvent() {
        EventMgr.Instance.RemoveListenner(EventKey.UI_Notice_True, this, this.onUINoticeTrue); //玩法点击同意
        EventMgr.Instance.RemoveListenner(EventKey.UI_ShowLogin, this, this.onUIShowLogin);
    }

    // 点击开始游戏
    private onBtnStartClick(button: cc.Button): void {
        DebugUtils.Log("====================Login_Ctrl.onBtnStartClick=================");
        button.interactable = false;
        SoundMgr.Instance.playSound(this.audioClip_btn);
        // 打开主场景UI
        EventMgr.Instance.Emit(EventKey.UI_EnterGame, "");
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
    public setMaskActive(active: boolean): void {
        if (this.mask) {
            this.mask.active = active;
        }
    }
}
