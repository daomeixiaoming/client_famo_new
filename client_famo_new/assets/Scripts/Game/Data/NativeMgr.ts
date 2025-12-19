import EventMgr from "../../Framework/Managers/EventMgr";
import CocosUtils from "../../Framework/Utils/CocosUtils";
import DebugUtils from "../../Framework/Utils/DebugUtils";
import { EventKey } from "../Config/EventCfg";
import { NetCfg } from "../Config/GameConfig";
import GameLogic from "../GameLogic";

const { ccclass, property } = cc._decorator;
/**
 * 处理所有的和app应用交互的
 */

export interface IBridgeResponse<T> {
    code: number;
    message: string;
    data: T;
}

export interface IUserInfo {
    appToken: string; // appToken
    authStatus: 0 | 1; // 实名状态：0->未实名，1->已实名
    avatar: string;
    emToken: string; // 环信emToken
    firstLogin: boolean;
    phoneNumber: string;
    registerType: 1 | 2 | 3 | 4; // 注册类型：1->手机登录注册，2->微信登录注册，3->苹果登录注册，4->QQ登录注册
    teenModeSwitch: 1 | 0;
    userId: number;
    userName: string;
    userType: 1 | 2; // 用户类型：1-用户，2-主播
}

export interface IAPPInfo {
    appVersion: string;
    deviceId: string;
    deviceName: string;
    deviceType: number;
    systemVersion: string;
    statusBarHeight: number; // 34
    navigationBarHeight: number;
    safeAreaInsetBottom: number; // 44
}

@ccclass
export default class NativeMgr extends cc.Component {
    public static Instance: NativeMgr = null as unknown as NativeMgr
    onLoad(): void {
        if (NativeMgr.Instance === null) {
            NativeMgr.Instance = this;
        } else {
            this.destroy();
            return;
        }
    }

    public Init(): void {
        // DebugUtils.Log("========NativeMgr Init11==========");

        document.addEventListener("visibilitychange", () => {
            // DebugUtils.Log("==================NativeMgr.onHide1============================");
            if (document.visibilityState === "hidden") {
                this.onHide();
            } else {
                this.onShow();
            }
        });

        // cc.game.on(cc.game.EVENT_HIDE, this.onHide, this);
        // cc.game.on(cc.game.EVENT_SHOW, this.onShow, this);
    }

    private onHide() {
        DebugUtils.Log("==================NativeMgr.onHide============================");
    }

    private onShow() {
        DebugUtils.Log("==================NativeMgr.onShow============================");
        this.updateGameInfo();
    }

    /**
     * 
     * @param methodName 
     * @param params 
     * @param callback 
     */
    private callBridge(methodName: string, params, callback) {
        let WebViewJavascriptBridge = window["WebViewJavascriptBridge"];
        DebugUtils.Log("====WebViewJavascriptBridge begin");
        if (WebViewJavascriptBridge) {
            DebugUtils.Log("====WebViewJavascriptBridge   callHandler:" + methodName);
            WebViewJavascriptBridge.callHandler(methodName, params, (res) => {
                DebugUtils.Log("====WebViewJavascriptBridge res:" + methodName, res);
                callback(res);
            });
        }
    }

    //-------------------------------------------------------------------------------------------------------------------------
    // 点击从游戏返回直播间
    public backToApp(): void {
        let temp = cc.sys.os;
        DebugUtils.Log("==============点击返回直播间==============", temp);
        if (cc.sys.os === cc.sys.OS_WINDOWS) {
            DebugUtils.Log("当前运行在 Windows 系统上");
            // 这里可以添加 Windows 平台特定的逻辑
        } else {
            DebugUtils.Log("当前不是 Windows 系统");
            this.callBridge("goBack", {}, () => { });
        }
    }

    // 跳转到个人中心商城
    public gotoShop(): void {
        this.callBridge(
            "navigateNativeRoute",
            { to: "customerChargeCenter" },
            (res) => { }
        );
    }

    //更新数据
    public updateGameInfo(): void {
        //更新大厅数据
        GameLogic.Instance.resetGameInfo();
        this.callBridge("refreshAmount", {}, (res) => {
            // DebugUtils.Log("refreshAmount res", res);
            DebugUtils.Log("============updateGameInfo.refreshAmount============", res);
            if (res.code == 0) {
                // EventMgr.emit("onGetPlayerInfo", res.data);
            }
        });
    }

    // 取直播间信息
    public getLiveRoomInfo() {
        if (!this.isBridgeReady()) {
            // DebugUtils.Log("===========getLiveRoomInfo1=============");
            EventMgr.Instance.Emit(EventKey.Native_GetLiveInfo, "");
            return;
        }
        this.callBridge("getLiveRoomInfo", {}, (res) => {
            if (res.code == 0) {
                let data = res.data;
                GameLogic.Instance.roomId = data.roomId;
                GameLogic.Instance.anchorId = data.anchorId;
                // DebugUtils.Log("===========getLiveRoomInfo3=============");
                EventMgr.Instance.Emit(EventKey.Native_GetLiveInfo, "");
            }
        });
    }

    /** 取用户信息 */
    public getUserInfo() {
        if (!this.isBridgeReady()) {
            // DebugUtils.Log("===========getUserInfo1=============");
            EventMgr.Instance.Emit(EventKey.Native_UserInfo, "");
            return;
        }
        this.callBridge("getUserInfo", {}, (res: IBridgeResponse<IUserInfo>) => {
            NetCfg.token = res.data.appToken;
            DebugUtils.Log("===========getUserInfo2=============");
            DebugUtils.Log("===== token:", NetCfg.token);
            EventMgr.Instance.Emit(EventKey.Native_UserInfo, "");
        });
    }

    /** 判断是否是windows 开发平台 */
    public isBridgeReady() {
        let WebViewJavascriptBridge = window["WebViewJavascriptBridge"];
        if (WebViewJavascriptBridge) {
            return true;
        }
        return false;
    }

    public getAppInfo() {
        if (!this.isBridgeReady()) {
            // DebugUtils.Log("===========getAppInfo1=============");
            EventMgr.Instance.Emit(EventKey.Native_AppInfo, "");
            return;
        }
        this.callBridge("getAppInfo", {}, (res) => {
            let appInfo: IAPPInfo = res.data;
            GameLogic.Instance.appInfo = appInfo;
            // DebugUtils.Log("===========getAppInfo2=============");
            EventMgr.Instance.Emit(EventKey.Native_AppInfo, "");
        });
    }
}
