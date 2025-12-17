import EventMgr from "./Framework/Managers/EventMgr";
import { NetMgr, NetMsg } from "./Framework/Managers/Net/NetMgr";
import NodePoolMgr from "./Framework/Managers/NodePoolMgr";
import { ResMgr } from "./Framework/Managers/ResMgr";
import { ResMgrAsync } from "./Framework/Managers/ResMgrAsync";
import SoundMgr from "./Framework/Managers/SoundMgr";
import UIMgr from "./Framework/Managers/UIMgr";
import DebugUtils from "./Framework/Utils/DebugUtils";
import { EventKey } from "./Game/Config/EventCfg";
import { GameConfig, NetCfg } from "./Game/Config/GameConfig";
import GameApp from "./Game/GameApp";
import GameLogic from "./Game/GameLogic";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameLanch extends cc.Component {
  @property({
    tooltip: "是否使用webSocket",
  })
  isWebSocket: boolean = false;

  @property({
    tooltip: "是否开启debug模式",
  })
  isDebug: boolean = false;
  wsCom: NetMgr = null;
  labStatus: cc.Label;

  onLoad() {
    DebugUtils.Log("===========GameLanch onLoad================");

    // 设置节点未常驻节点
    // cc.game.addPersistRootNode(this.node);
    this.labStatus = this.node
      .getChildByName("labStatus")
      .getComponent(cc.Label);
    this.labStatus.string = "獲取App資訊中...";

    this.isDebug = CC_DEBUG;
    GameConfig.isDebug = this.isDebug;
    // 初始化框架逻辑

    // 资源管理模块
    this.node.addComponent(ResMgr);
    this.node.addComponent(ResMgrAsync);
    //声音管理模块
    this.node.addComponent(SoundMgr);
    //自定义事件的订阅与发布
    this.node.addComponent(EventMgr);

    // UI管理模块
    this.node.addComponent(UIMgr);
    // 节点池管理
    this.node.addComponent(NodePoolMgr).Init();

    this.registerEvent();

    //websocket 网络部分
    if (this.isWebSocket) {
      this.wsCom = this.node.addComponent(NetMgr);
      // DebugUtils.Log("===============GameLanch onLoad2==================", this.wsCom);
    }
    // end
    //游戏逻辑
    this.node.addComponent(GameApp).Init();
    // DebugUtils.Log("===============GameLanch onLoad1==================");

    let btnMsk = cc.find("Canvas/mask") as cc.Node;
    btnMsk.on("click", this.onBtnBackClick, this);
  }

  // 监听事件
  private registerEvent() {
    EventMgr.Instance.AddEventListener(
      EventKey.Start_EnterGame,
      this,
      this.onEventGameInit
    );
    EventMgr.Instance.AddEventListener(
      NetMsg.NetConnect,
      this,
      this.onWSConnect
    );
    EventMgr.Instance.AddEventListener(
      NetMsg.NetDisconnect,
      this,
      this.onWSDisConnect
    );
    EventMgr.Instance.AddEventListener(
      EventKey.UI_ShowLogin,
      this,
      this.onUIShowLogin
    );
    EventMgr.Instance.AddEventListener(
      EventKey.UI_LoadNoticeOver,
      this,
      this.onLoadNoticeOver
    );
    EventMgr.Instance.AddEventListener(
      EventKey.Http_Res_EnterHome,
      this,
      this.onEnterHome
    );
  }

  start() {
    // this.labStatus.string = "開始鏈接網路.....";
    // let url = NetCfg.wss + `?Authorization=${NetCfg.token}&bid=demon-slaying`;
    // if (this.wsCom) {
    //     this.wsCom.Init(url);
    // }
    // // 初始化网络
    // let url = NetCfg.wss + `?Authorization=${NetCfg.token}&bid=demon-slaying`;
    // NetMgr.Instance.Init(url);
  }

  // 销毁GameApp 注册的事件
  protected onDestroy(): void {
    // DebugUtils.Log("===============GameLanch.onDestroy==================");
    EventMgr.Instance.RemoveListenner(
      EventKey.Start_EnterGame,
      this,
      this.onEventGameInit
    );
    EventMgr.Instance.RemoveListenner(
      NetMsg.NetConnect,
      this,
      this.onWSConnect
    );
    EventMgr.Instance.RemoveListenner(
      NetMsg.NetDisconnect,
      this,
      this.onWSDisConnect
    );
    EventMgr.Instance.RemoveListenner(
      EventKey.UI_ShowLogin,
      this,
      this.onUIShowLogin
    );
    EventMgr.Instance.RemoveListenner(
      EventKey.UI_LoadNoticeOver,
      this,
      this.onLoadNoticeOver
    );
    EventMgr.Instance.RemoveListenner(
      EventKey.Http_Res_EnterHome,
      this,
      this.onEnterHome
    );

    // 关闭网络
    // NetMgr.Instance.close_socket();
  }

  //点击上部分区域，退出游戏到达直播间
  private onBtnBackClick() {
    console.warn("===============GameLanch.onBtnBackClick==================");
    GameApp.Instance.onExitGame();
  }

  // app相关数据获取成功，开始游戏初始化
  private onEventGameInit(uanme: string, udata: any): void {
    console.warn(
      "===============GameLanch.onEventWsConnectapp相关数据获取成功=================="
    );
    // 进入游戏里面去
    GameApp.Instance.EnterGame();
  }

  // 可以显示登录状态
  private onUIShowLogin(uanme: string, udata: any) {
    // console.warn("===============GameLanch.onUIShowLogin==================");
    this.labStatus.string = "資源加載完畢!";
    this.resetLabStatus();
    // this.labStatus.node.active = true;
    // let temp = this.labStatus.node;
    // let t1 = cc.tween(temp).to(1, { opacity: 0 });
    // let t2 = cc.tween(temp).to(1, { opacity: 255 });
    // cc.Tween.stopAllByTarget(temp)
    // cc.tween(temp)
    //     // .delay(1)
    //     .sequence(t1, t2)
    //     .repeatForever()
    //     .start()
  }

  private onLoadNoticeOver() {
    DebugUtils.Log("step4: GameLanch.onLoadNoticeOver 开始连接网络==========");
    // console.warn("===============GameLanch.onLoadNoticeOver==================");
    this.labStatus.string = "載入通知模組完畢!";
    this.resetLabStatus();
    //请求用户信息
    GameLogic.Instance.getPlayerInfo();
  }

  // 网络连接成功
  private onWSConnect(uanme: string, udata: any): void {
    // console.warn("===============GameLanch.onWSConnect网络连接成功==================");
    // this.labStatus.string = "網路連接成功!";
    this.resetLabStatus();
    DebugUtils.Log(
      "step5: GameLanch.onWSConnect 连接网络成功开始请求用户信息=========="
    );
    //请求用户信息
    // GameLogic.Instance.getPlayerInfo();
  }

  // 网络连接失败
  private onWSDisConnect(uanme: string, udata: any): void {
    // console.warn("===============GameLanch.onWSDisConnect==================");
    // this.labStatus.string = "網路連線失敗!";
    this.resetLabStatus();
  }

  private onEnterHome() {
    let temp = this.labStatus.node;
    cc.Tween.stopAllByTarget(temp);
    this.labStatus.string = "";
    this.resetLabStatus();
  }

  private resetLabStatus() {
    this.scheduleOnce(() => {
      this.labStatus.string = "";
    }, 3);
  }
}
