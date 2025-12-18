import EventMgr from "../Framework/Managers/EventMgr";
import { NetMgr } from "../Framework/Managers/Net/NetMgr";
import { ResMgr } from "../Framework/Managers/ResMgr";
import { ResMgrAsync } from "../Framework/Managers/ResMgrAsync";
import SoundMgr from "../Framework/Managers/SoundMgr";
import UIMgr, { UILayer } from "../Framework/Managers/UIMgr";
import DebugUtils from "../Framework/Utils/DebugUtils";
import TimeUtils from "../Framework/Utils/TimeUtils";
import { protoGame } from "../Proto/game";
import TestMgr from "./Common/TestMgr";
import { EventKey } from "./Config/EventCfg";
import { AbNames, GameConfig, UICfg } from "./Config/GameConfig";
import { PlayerInfoResp, PopType } from "./Config/MsgCfg";
import { ResCfg, SpineCfg } from "./Config/ResConfig";
import { ResPkg_Home, ResPkg_Home2 } from "./Config/ResPkgHome";
import { ResPkg_Login } from "./Config/ResPkgLogin";
import NativeMgr from "./Data/NativeMgr";
import NetHttpMgr from "./Data/NetHttpMgr";
import NetWsMgr from "./Data/NetWsMgr";
import End_Ctrl from "./GameCtrls/Home/End/End_Ctrl";

import GameLogic from "./GameLogic";
import UIView from "./UIView";

const { ccclass, property } = cc._decorator;

/**
 * 游戏App 管理器
 */
@ccclass
export default class GameApp extends cc.Component {
  public timeStart: number = 0; //记录开始的时间

  public static Instance: GameApp = null as unknown as GameApp;
  public gameAtals: cc.SpriteAtlas = null;
  clickAni: cc.Node;
  comName: string; //标记组件名字
  sp_bg: cc.Sprite; //背景图
  nativeList: any[] = []; //记录native 次数
  popCur: number; //记录今日是否弹出玩法公告的状态

  onLoad(): void {
    if (GameApp.Instance === null) {
      GameApp.Instance = this;
    } else {
      this.destroy();
      return;
    }
  }

  public Init() {
    this.comName = "GameApp";
    let isActive = GameConfig.isDebug === true ? true : false;
    this.node.getChildByName("debug").active = false;

    // 注册事件
    this.RegisterEvent();

    //点击动销的节点
    this.clickAni = this.node.getChildByName("Mask").getChildByName("temp");
    this.clickAni.active = true;

    // 添加模块
    // 添加解释数据的类
    this.node.addComponent(GameLogic).Init();
    this.node.addComponent(NetHttpMgr).Init();
    this.node.addComponent(NativeMgr).Init();
    this.node.addComponent(NetWsMgr).Init();
    this.node.addComponent(UIView).Init();
    // 测试
    this.node.addComponent(TestMgr);
    // 获取主播id和房间号
    NativeMgr.Instance.getLiveRoomInfo();
    NativeMgr.Instance.getAppInfo();
    NativeMgr.Instance.getUserInfo();
  }

  protected onDestroy(): void {
    DebugUtils.Log("=======GameApp.onDestroy===========");
    this.UnRegisterEvent();
  }

  private RegisterEvent() {
    EventMgr.Instance.AddEventListener(EventKey.Native_GetLiveInfo, this, this.onNativeLiveInfo);
    EventMgr.Instance.AddEventListener(EventKey.Native_AppInfo, this, this.onNativeAppInfo);
    EventMgr.Instance.AddEventListener(EventKey.Native_UserInfo, this, this.onNativeUserInfo);
    EventMgr.Instance.AddEventListener(EventKey.Http_Res_GetPlayerInfo, this, this.onGetPlayerInfoRes); //用户数据返回
    EventMgr.Instance.AddEventListener(EventKey.UI_ShowShopMoney, this, this.onUIEventShowMoneyShop);
    EventMgr.Instance.AddEventListener(EventKey.UI_EnterGame, this, this.onUIEventEnterHome); //进入大厅 返回
    EventMgr.Instance.AddEventListener(EventKey.UI_ClickAni, this, this.onUIEventClickAni);
    EventMgr.Instance.AddEventListener(EventKey.WS_RewardBox, this, this.onWSRewardBox);
  }

  private UnRegisterEvent() {
    EventMgr.Instance.RemoveListenner(EventKey.Native_GetLiveInfo, this, this.onNativeLiveInfo);
    EventMgr.Instance.RemoveListenner(EventKey.Native_AppInfo, this, this.onNativeAppInfo);
    EventMgr.Instance.RemoveListenner(EventKey.Native_UserInfo, this, this.onNativeUserInfo);
    EventMgr.Instance.RemoveListenner(EventKey.Http_Res_GetPlayerInfo, this, this.onGetPlayerInfoRes); //用户数据返回
    EventMgr.Instance.RemoveListenner(EventKey.UI_ShowShopMoney, this, this.onUIEventShowMoneyShop);
    EventMgr.Instance.RemoveListenner(EventKey.UI_EnterGame, this, this.onUIEventEnterHome); //进入大厅 返回
    EventMgr.Instance.RemoveListenner(EventKey.UI_ClickAni, this, this.onUIEventClickAni);
    EventMgr.Instance.RemoveListenner(EventKey.WS_RewardBox, this, this.onWSRewardBox);
  }

  // 返回应用层
  public onExitGame() {
    DebugUtils.Log("=======GameApp.onExitGame===========");
    this.UnRegisterEvent();

    // 关闭所有音效
    SoundMgr.Instance.stopAllAudio();

    // 释放登录资源
    ResMgr.Instance.releaseResPkg(ResPkg_Login);
    // 释放游戏主场景资源
    ResMgr.Instance.releaseResPkg(ResPkg_Home);

    ResMgr.Instance.releaseResPkg(ResPkg_Home2);

    // 销毁玩法公约节点
    UIView.Instance.desAll();
    // 关闭sock
    NetMgr.Instance.CloseSocket();
    //返回 应用层
    NativeMgr.Instance.backToApp();
  }

  // 游戏逻辑入口
  public EnterGame(): void {
    DebugUtils.Log("===GameApp Enter Game ....!");
    this.timeStart = new Date().getTime();
    // 直接加载登录模块
    this.LoadLoginModel();
  }

  // private async getNotice() {
  //   //  加载玩法公告UI
  //   if (!this.playNotice) {
  //     let com = await UIMgr.Instance.ShowUIViewAsync(
  //       ResCfg.Prefabs.Notice,
  //       AbNames.Prefabs
  //     );
  //     this.playNotice = com.node;
  //     this.playNotice.active = false;
  //   }
  //   // return this.playNotice;
  // }

  // 加载登录模块的资源
  private LoadLoginModel(endCall?: Function): void {
    // DebugUtils.Log("============加载登录模块 start=============");
    let pre = ResMgr.Instance.getAsset(AbNames.Prefab_Login, UICfg.Login, cc.Prefab);
    if (pre) {
      DebugUtils.Log("============加载登录模块 end1=============");
      this.EnterLoadingScene();
      //回调存在就执行
      endCall && endCall();
      return;
    }
    ResMgr.Instance.preloadResPkg(ResPkg_Login,
      (now: any, total: any) => {
        // DebugUtils.Log(now, total);
      },
      () => {
        DebugUtils.Log("============加载登录模块 end=============");
        this.EnterLoadingScene();
        //回调存在就执行
        endCall && endCall();
      }
    );
  }

  // 加载通用模块返回
  public EnterLoadingScene() {
    let time1 = new Date().getTime() - this.timeStart;
    // 加载完显示大厅的UI
    UIMgr.Instance.ShowUIView(UICfg.Login, AbNames.Prefab_Login);

    let time = new Date().getTime() - this.timeStart;
    DebugUtils.Log("=========GameApp加载完显示Login,耗时（ms）============", time);

    // 加载通知模块
    GameLogic.Instance.loadNoticePkg();
  }

  /**
   * 播放音效
   * @param audioPath
   */
  public async playEffectAudio(audioPath: string) {
    let audioClip = (await ResMgrAsync.Instance.IE_GetAsset(AbNames.Sounds, audioPath, cc.AudioClip)) as cc.AudioClip;
    if (audioClip) {
      SoundMgr.Instance.playSound(audioClip);
    }
  }

  /**
   * 获取game 图集的资源
   * @param sfName
   * @returns
   */
  public getSfFromGameList(sfName: string): cc.SpriteFrame | null {
    let res = null;
    let sf = this.gameAtals.getSpriteFrame(sfName);
    if (sf) {
      res = sf;
    }
    return res;
  }

  // 显示伏魔券商城
  private async onUIEventShowMoneyShop(uname: string, udata: any) {
    let parent = UIMgr.Instance.GetParent(UILayer.UI_Layer2);
    UIMgr.Instance.ShowUIViewAsync(ResCfg.Prefabs.ShopMoney, AbNames.Prefabs, parent);
  }

  // 显示加载资源界面
  private async onUIEventEnterHome(uname: string, udata: any) {
    DebugUtils.Log("===========GameApp.onUIEventEnterHome==============");
    // 显示Loading
    await UIMgr.Instance.ShowUIViewAsync(
      ResCfg.Prefabs.Loading,
      AbNames.Prefabs
    );

    // 加在Home必须的资源
    ResMgr.Instance.preloadResPkg(ResPkg_Home, (now: any, total: any) => {
      let num = now / total;
      // DebugUtils.Log("onUIEventEnterHome num = ", num);
      EventMgr.Instance.Emit(EventKey.UI_Loading, num);
    },
      () => {
        DebugUtils.Log(
          "===========onUIEventEnterHome 加载完毕，显示大厅================="
        );
        EventMgr.Instance.Emit(EventKey.UI_Loading, 1);
        // this.goToHome();
        this.scheduleOnce(() => {
          this.goToHome();
        });
      }
    );
  }

  //触摸动销
  private onUIEventClickAni(uname: string, udata: cc.Vec3) {
    DebugUtils.Log(
      "==================================GameApp.onUIEventClickAni============================");
    this.clickAni.active = true;
    this.clickAni.setPosition(udata);
    let spAni = this.clickAni.getComponent(sp.Skeleton);
    // ResMgrAsync.Instance.IE_GetAsset(AbNames.Spine, SpineCfg.sp_click, sp.SkeletonData).then((res: sp.SkeletonData) => {
    //   if (res && spAni) {
    //     spAni.skeletonData = res;
    //     spAni.setAnimation(0, "animation", false);
    //   }
    // })
  }

  // Boss死亡弹出的宝箱
  private async onWSRewardBox(uname: string, udata: protoGame.IBoxInfo) {
    if (udata) {
      let parent = UIMgr.Instance.GetParent(UILayer.UI_Layer2);
      let com = (await UIMgr.Instance.ShowUIViewAsync(
        ResCfg.Prefabs.End,
        AbNames.Prefabs,
        parent
      )) as End_Ctrl;
      com.setData(udata);
    }
  }

  // 进入大厅
  private goToHome() {
    // await this.isLoadShopAb();
    DebugUtils.Log("==============goToHome================");

    // 显示大厅界面
    UIMgr.Instance.ShowUIView(UICfg.Home, AbNames.Prefab_Home);
    // 关闭登录和加载
    UIMgr.Instance.DestroyView(ResCfg.Prefabs.Loading);
    UIMgr.Instance.DestroyView(UICfg.Login);

    // this.isLoadShopAb();
    // 加在Home必须的资源
    ResMgr.Instance.preloadResPkg(ResPkg_Home2, (now: any, total: any) => {
      let num = now / total;
    },
      () => {
        DebugUtils.Log(
          "===========二级资源加载完毕================="
        );
      }
    );
  }

  // 获取App的相关数据成功
  private udateNativeStatuse() {
    if (this.nativeList.length < 3) {
      return;
    }
    // 连接网络
    DebugUtils.Log(
      "step1: GameApp.udateNativeStatuse 获取App的相关数据成功=========="
    );
    EventMgr.Instance.Emit(EventKey.Start_EnterGame, "1");
  }
  //-------------------------------------------------------网络消息返回--------------------------------------------------------------
  private onNativeLiveInfo(uanme: string, udata: any): void {
    this.nativeList.push(uanme);
    this.udateNativeStatuse();
  }
  private onNativeAppInfo(uanme: string, udata: any): void {
    this.nativeList.push(uanme);
    this.udateNativeStatuse();
  }
  private onNativeUserInfo(uanme: string, udata: any): void {
    this.nativeList.push(uanme);
    this.udateNativeStatuse();
  }

  // 获取用户信息返回,显示广告公约状态
  private async onGetPlayerInfoRes(path: string, data: PlayerInfoResp) {
    if (!data) {
      return;
    }
    let pop = data.pop;
    this.popCur = pop;
    // pop = PopType.Pop_Always; //测试
    DebugUtils.Log(
      "=================================onGetPlayerInfoRes=================================",
      pop
    );
  }

  // 显示玩法公告状态
  public showNoticeStatus(): void {
    DebugUtils.Log(
      "=================================showNoticeStatus=================================",
      this.popCur
    );

    let pop = this.popCur;
    // 测试
    // pop = PopType.Pop_Always;
    if (pop === PopType.Pop_Nan) {
      //不弹 0
      UIView.Instance.showNotice(false);
    }
    if (pop === PopType.Pop_Always) {
      //每次弹 1
      UIView.Instance.showNotice(true);
      // this.checkNotice(1);
    }
    if (pop === PopType.Pop_Day) {
      //每天弹一次 2
      this.checkNotice(2);
    }
    if (pop == PopType.Pop_Week) {
      //每周弹一次 3
      this.checkNotice(3);
    }
    if (pop == PopType.Pop_Month) {
      //每月弹一次 3
      this.checkNotice(4);
    }
  }

  private checkNotice(flag: number): void {
    let lastTime = cc.sys.localStorage.getItem("agree_notice_pop");
    let oldDate = null;
    if (lastTime) {
      oldDate = new Date(Number(lastTime));
    }
    DebugUtils.Log("====lastTime", lastTime, oldDate, flag);
    let date = new Date();
    if (flag == 1) {
      if (oldDate && date.getDate() == oldDate.getDate()) {
        UIView.Instance.showNotice(false);
        return;
      }
    }
    // 判断是否是同一天
    if (flag == 2) {
      if (oldDate && date.getDate() == oldDate.getDate()) {
        UIView.Instance.showNotice(false);
        return;
      }
    }
    if (flag == 3) {
      // 使用ISO周标准比较
      const dateWeek = TimeUtils.getISOWeek(date);
      const oldDateWeek = TimeUtils.getISOWeek(oldDate);
      if (
        dateWeek.year === oldDateWeek.year &&
        dateWeek.week === oldDateWeek.week
      ) {
        UIView.Instance.showNotice(false);
        return;
      }
    }
    //判断是否是同一月
    if (flag == 4) {
      if (oldDate && date.getMonth() == oldDate.getMonth()) {
        UIView.Instance.showNotice(false);
        return;
      }
    }

    // 成功
    // this.playNotice.active = true;
    UIView.Instance.showNotice(true);
  }

  /**
   * 显示配置
   * @param type 1 是正常 2、无数据情况
   */
  public async showGameBoxCfgUI(type: number = 1) {
    let p = null;
    if (type === 1) {
      p = UIMgr.Instance.GetParent(UILayer.UI_Layer3);
    } else {
      p = UIMgr.Instance.GetParent(UILayer.UI_Layer2);
    }
    console.log("==============showGameBoxCfgUI======================", type);
    let com = await UIMgr.Instance.ShowUIViewAsync(
      ResCfg.Prefabs.RewardPrice,
      AbNames.Prefabs,
      p
    );
    com.setData(type);
    EventMgr.Instance.Emit(EventKey.UI_UpadteBtnStatus, "");
  }
}
