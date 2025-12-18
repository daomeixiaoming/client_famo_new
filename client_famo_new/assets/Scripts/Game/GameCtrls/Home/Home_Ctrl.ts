import EventMgr from "../../../Framework/Managers/EventMgr";
import { NetMgr } from "../../../Framework/Managers/Net/NetMgr";
import NodePoolMgr from "../../../Framework/Managers/NodePoolMgr";
import { ResMgrAsync } from "../../../Framework/Managers/ResMgrAsync";
import SoundMgr from "../../../Framework/Managers/SoundMgr";
import UIBase from "../../../Framework/Managers/UIBase";
import UIMgr, { UILayer } from "../../../Framework/Managers/UIMgr";
import CocosUtils from "../../../Framework/Utils/CocosUtils";
import DebugUtils from "../../../Framework/Utils/DebugUtils";
import GameUtils from "../../../Framework/Utils/GameUtils";
import RandomUtils from "../../../Framework/Utils/RandomUtils";
import TimeUtils from "../../../Framework/Utils/TimeUtils";
import { protoGame } from "../../../Proto/game";
import { EventKey } from "../../Config/EventCfg";
import { AbNames, Atals1Cfg, Lngs, NetCfg } from "../../Config/GameConfig";
import { AtkType, AttackInfo, AttackResponse, BoxInfo, BoxType, HomeResponse, OpenBoxResponse, } from "../../Config/MsgCfg";
import { GuiCfg, ResCfg, SpineCfg } from "../../Config/ResConfig";
import GameApp from "../../GameApp";
import GameLogic from "../../GameLogic";
import EndGetBox2_Ctrl from "./End/EndGetBox2_Ctrl";
import EndGetBox_Ctrl from "./End/EndGetBox_Ctrl";
import EndOpen_Ctrl from "./End/EndOpen_Ctrl";
import Help_Ctrl from "./Help/Help_Ctrl";
import HomeMenu_Ctrl from "./HomeMenu_Ctrl";
import Rank_Ctrl from "./Rank/Rank_Ctrl";

const { ccclass, property } = cc._decorator;

// 游戏状态
const GameStatus = {
  Nane: 0,
  Normal: 1, // 正常状态
  FuHuo: 2, //复活状态
};

/**
 * 大厅主场景
 */
@ccclass
export default class Home_Ctrl extends UIBase {
  pro_hpbar: cc.Sprite;
  sp_hpani: cc.Node = null;
  addBetArea: cc.Node;
  tipNode: cc.Node;
  status_fh: cc.Node;
  boss: cc.Node;
  lab_hp: cc.Label;
  sp_voice: cc.Sprite;
  isClickVoice: boolean = true;
  lb_pms: cc.Label;

  // 复活的倒计时回调
  callback_fh: Function = null;
  gameStatus: number = GameStatus.Nane; //游戏状态
  node_hp: cc.Node;
  spAno: cc.Sprite;
  hpAniNode: cc.Node;
  hpBg: cc.Node;
  hpPro: cc.ProgressBar;

  isAddBoss = false;
  isAddHp = false;
  isAddLight = false;

  onLoad() {
    super.onLoad();
    this.initUI();
    this.initData();
    this.RegisterEvent();
  }

  protected async start() {
    DebugUtils.Log(
      "===================Home_Ctrl.start 开始连接网络========================="
    );

    // 初始化跑马灯
    this.setTipAni();
    DebugUtils.Log(
      "===================Home_Ctrl.start 开始连接网络1========================="
    );

    // 初始化网络
    let url = NetCfg.wss + `?Authorization=${NetCfg.token}&bid=demon-slaying`;
    NetMgr.Instance.Init(url);
    //停止背景音乐
    GameLogic.Instance.stopBgMusic();

    // 显示玩法公告状态
    GameApp.Instance.showNoticeStatus();
  }

  protected update(dt: number): void {

  }

  protected onDestroy(): void {
    DebugUtils.Log(
      "===================Home_Ctrl.onDestroy 关闭网络========================="
    );

    // 关闭网络
    NetMgr.Instance.CloseSocket();
    NetMgr.Instance.isStart = false;
    NetMgr.Instance.stopHeartbeat();

    this.UnRegisterEvent();

    // 清理节点池
    NodePoolMgr.Instance.ClearAllNodeInPool(AbNames.Prefabs, ResCfg.Prefabs.addBetItem);

    this.clearFHCallBack();
  }

  private initUI() {
    let bgCur = this.ViewComponent("node/home_bg", cc.Sprite) as cc.Sprite;
    GameUtils.SetSpTexture(AbNames.Gui, GuiCfg.home_bg, bgCur);
    let spBoss = this.ViewComponent("node/svgas/svga_boss/sp_boss", cc.Sprite) as cc.Sprite;
    GameUtils.SetSpTexture(AbNames.Gui, GuiCfg.game_boss, spBoss);

    this.AddButtonListener("node/btn_close", this, this.onBtnBackClick);
    this.AddButtonListener("node/btns/btn1", this, this.onBtnRankClick); //排行榜
    this.AddButtonListener("node/btns/btn2", this, this.onBtnRecordClick); //中中奖记录
    this.AddButtonListener("node/btns/btn3", this, this.onBtnHelpClick); //活动说明
    this.AddButtonListener("node/btns/btn4", this, this.onAddBet1Click); //点击攻击
    this.AddButtonListener("node/btns/btn5", this, this.onAddBet2Click);
    this.AddButtonListener("node/btns/btn6", this, this.onAddBet3Click);
    this.AddButtonListener("node/btns/btn9/sp_btn", this, this.onBtnBox1Click); //宝箱
    this.AddButtonListener("node/btns/btn8/sp_btn", this, this.onBtnBox2Click);
    this.AddButtonListener("node/btns/btn7/sp_btn", this, this.onBtnBox3Click);
    this.AddButtonListener("node/item_bg/btn_add", this, this.onBtnAddClick);
    this.AddButtonListener("node/btn_voice", this, this.onVoiceClick); //声音
    // 血条显示
    this.lab_hp = this.ViewComponent("node/home_hp/lab", cc.Label) as cc.Label;
    // 血条滑动条
    this.pro_hpbar = this.ViewComponent(
      "node/home_hp/barBg/bar",
      cc.Sprite
    ) as cc.Sprite;

    // 声音的组件
    this.sp_voice = this.ViewComponent(
      "node/btn_voice/sp_voice",
      cc.Sprite
    ) as cc.Sprite;
    // 破魔券
    this.lb_pms = this.ViewComponent("node/item_bg/lab", cc.Label) as cc.Label;

    // 血条节点
    this.node_hp = this.view["node/home_hp"] as cc.Node;
    this.hpBg = this.view["node/home_hp/barBg"] as cc.Node;
    this.sp_hpani = this.view["node/home_hp/barBg/hpAni"] as cc.Node;
    this.hpAniNode = this.view["node/home_hp/aniNode/hpAniNode"] as cc.Node;
    let bg = this.view["node/home_bg"] as cc.Node;
    bg.active = true;
    this.hpPro = this.ViewComponent(
      "node/home_hp/ProgressBar",
      cc.ProgressBar
    ) as cc.ProgressBar;

    // 下注返回收到伏魔券的区域
    this.addBetArea = this.view["node/add_score"] as cc.Node;

    // 广告条节点
    this.tipNode = this.view["node/top_txt/richText"] as cc.Node;

    // 复活相关的节点
    this.status_fh = this.view["node/mid"] as cc.Node;
    DebugUtils.Log("============Home_Ctrl.initUI13=======================");
    // Boss 节点

    //点击触摸事件
    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);

    this.boss = this.view["node/svgas/svga_boss"] as cc.Node;
    this.boss.active = true;

    // 创建Boss动画
    this.createBoss();
    this.createSnow();
    this.createCircle();

    // 请求大厅场景消息
    GameLogic.Instance.enterHome();
  }

  // 更新所有按钮的状态，防止狂点
  private updateBtnsStatus(active: boolean) {
    let paths = [
      "node/btns/btn1",
      "node/btns/btn2",
      "node/btns/btn3",
      "node/btns/btn4",
      "node/btns/btn5",
      "node/btns/btn6",
      "node/btns/btn7/sp_btn",
      "node/btns/btn8/sp_btn",
      "node/btns/btn9/sp_btn",
    ];
    for (let i = 0; i < paths.length; i++) {
      let path = paths[i];
      let btn = this.ViewComponent(path, cc.Button) as cc.Button;
      if (btn) {
        btn.interactable = active;
      }
    }
  }

  /** 播放Boss动画 */
  private createBoss() {
    // Boss节点
    let spAni = this.ViewComponent("node/svgas/svga_boss/AniBoss", sp.Skeleton) as sp.Skeleton;
    ResMgrAsync.Instance.IE_GetAsset(AbNames.Spine, SpineCfg.sp_boss, sp.SkeletonData).then((res: sp.SkeletonData) => {
      if (res && spAni) {
        spAni.skeletonData = res;
        spAni.setAnimation(0, "animation", true);
      }
    })
  }

  /** 创建落雪动画 */
  private createSnow() {
    let spAni = this.ViewComponent("node/svgas/ani_snow/sp_snow", sp.Skeleton) as sp.Skeleton;
    ResMgrAsync.Instance.IE_GetAsset(AbNames.Spine, SpineCfg.sp_snow, sp.SkeletonData).then((res: sp.SkeletonData) => {
      if (res && spAni) {
        spAni.skeletonData = res;
        spAni.setAnimation(0, "animation", true);
      }
    })
  }

  /** 创建光圈动画 */
  private createCircle() {
    let spAni = this.ViewComponent("node/svgas/svga_boss/circle/Anicircle", sp.Skeleton) as sp.Skeleton;
    ResMgrAsync.Instance.IE_GetAsset(AbNames.Spine, SpineCfg.sp_circle, sp.SkeletonData).then((res: sp.SkeletonData) => {
      if (res && spAni) {
        spAni.skeletonData = res;
        spAni.setAnimation(0, "animation", true);
      }
    })
  }

  /** 创建攻击动销 */
  private createAtkAni(type: number) {
    let path = null;
    let audioPath = null;
    DebugUtils.Log("===================Home_Ctrl.createAtkAni1====================", type);
    switch (type) {
      case AtkType.Atk_500:
        path = SpineCfg.sp_atk500;
        audioPath = ResCfg.VoiceCfg.atk_500;
        break;
      case AtkType.Atk_2500:
        path = SpineCfg.sp_atk2500;
        audioPath = ResCfg.VoiceCfg.atk_2500;
        break;
      case AtkType.Atk_5000:
        path = SpineCfg.sp_atk5000;
        audioPath = ResCfg.VoiceCfg.atk_5000;
        break;
    }

    //播放音效
    if (audioPath) {
      GameApp.Instance.playEffectAudio(audioPath);
    }
    if (path) {
      let spAni = this.ViewComponent("node/svgas/atkAni/spAddBet", sp.Skeleton) as sp.Skeleton;
      DebugUtils.Log("===================Home_Ctrl.createAtkAni2====================", spAni);
      ResMgrAsync.Instance.IE_GetAsset(AbNames.Spine, path, sp.SkeletonData).then((res: sp.SkeletonData) => {
        DebugUtils.Log("===================Home_Ctrl.createAtkAni3====================", res);
        if (res && spAni) {
          spAni.skeletonData = res;
          spAni.setAnimation(0, "animation", false);
        }
      })
    }
  }

  private initData(): void {
    DebugUtils.Log("===================Home_Ctrl.initData====================");
    //加载节点池
    NodePoolMgr.Instance.AddNodePool(AbNames.Prefabs, ResCfg.Prefabs.addBetItem, 20);

    this.setBoxStatus(BoxType.Box_BY, 0);
    this.setBoxStatus(BoxType.Box_HJ, 0);
    this.setBoxStatus(BoxType.Box_ZS, 0);

    // 更新破魔石
    this.setPMSNum();

    this.status_fh.active = false;
    // this.boss.active = false;
    this.setHpStatus();

    //初始化声音
    this.setBtnViceSp();

    // 请求活动配置数据
    GameLogic.Instance.getGameRates();
  }

  private RegisterEvent() {
    EventMgr.Instance.AddEventListener(
      EventKey.Http_Res_EnterHome,
      this,
      this.onHttpMsgEnterHomeRes
    ); //场景消息返回
    EventMgr.Instance.AddEventListener(
      EventKey.Http_Res_Atk,
      this,
      this.onHttpMsgAtkRes
    ); //1 攻击返回
    EventMgr.Instance.AddEventListener(
      EventKey.Http_Res_OpenBoxRes,
      this,
      this.onHttpMsgOpenBoxRes
    ); //1
    EventMgr.Instance.AddEventListener(
      EventKey.WS_UpdateBoss,
      this,
      this.onWsEventUpdateBoss
    ); //更新Boss信息
    EventMgr.Instance.AddEventListener(
      EventKey.WS_RewardBox,
      this,
      this.onWsEventRewardBox
    );
    EventMgr.Instance.AddEventListener(
      EventKey.Update_ExorcismVoucher,
      this,
      this.setPMSNum
    );

    EventMgr.Instance.AddEventListener(
      EventKey.UI_UpadteBtnStatus,
      this,
      this.updateBtnStatus
    );
  }

  private UnRegisterEvent() {
    // DebugUtils.Log("============Home_Ctrl.UnRegisterEvent=======================");
    EventMgr.Instance.RemoveListenner(
      EventKey.Http_Res_EnterHome,
      this,
      this.onHttpMsgEnterHomeRes
    );
    EventMgr.Instance.RemoveListenner(
      EventKey.Http_Res_Atk,
      this,
      this.onHttpMsgAtkRes
    );
    EventMgr.Instance.RemoveListenner(
      EventKey.Http_Res_OpenBoxRes,
      this,
      this.onHttpMsgOpenBoxRes
    ); //1
    EventMgr.Instance.RemoveListenner(
      EventKey.WS_UpdateBoss,
      this,
      this.onWsEventUpdateBoss
    );
    EventMgr.Instance.RemoveListenner(
      EventKey.WS_RewardBox,
      this,
      this.onWsEventRewardBox
    );
    EventMgr.Instance.RemoveListenner(
      EventKey.Update_ExorcismVoucher,
      this,
      this.setPMSNum
    );
    EventMgr.Instance.RemoveListenner(
      EventKey.UI_UpadteBtnStatus,
      this,
      this.updateBtnStatus
    );
  }

  private clearFHCallBack() {
    if (this.callback_fh) {
      this.unschedule(this.callback_fh);
      this.callback_fh = null;
    }
  }

  private showHPActive(active: boolean): void {
    this.node_hp.active = active;
  }

  /**
   * 显示复活数据
   * @param time_fh respawnTimer 剩余时间
   * @param time_next  respawnAt 复活的具体时间
   */
  private showFHData(time_fh: number, time_next: number): void {
    this.status_fh.active = true;

    // 剩余倒计时
    let lab_last = this.ViewComponent(
      "node/mid/layout_time/lab_time",
      cc.Label
    ) as cc.Label;
    // 复活的具体时间
    let lab_next = this.ViewComponent("node/mid/labTime", cc.Label) as cc.Label;

    // 测试时间
    let des = TimeUtils.FormatTime(time_next);
    lab_next.string = des;

    // 倒计时
    let des1 = TimeUtils.formatMillisecondsToHMS(time_fh);
    lab_last.string = des1;
    DebugUtils.Log("=========showFHData===========", des1);
    this.clearFHCallBack();
    this.callback_fh = function () {
      if (time_fh < 0) {
        lab_last.string = "00:00:00";
        this.clearFHCallBack();
        return;
      }
      time_fh -= 1000;
      if (time_fh > 0) {
        let des1 = TimeUtils.formatMillisecondsToHMS(time_fh);
        lab_last.string = des1;
      } else {
        lab_last.string = "00:00:00";
      }
    };
    this.schedule(this.callback_fh, 1);
  }

  //更新破魔石
  private setPMSNum() {
    let ex = GameLogic.Instance.getExorcismVoucher();
    let des = CocosUtils.formatNum(ex, 0);
    this.lb_pms.string = des;
  }

  // 跑马灯动画
  private setTipAni(): void {
    let temp = this.tipNode;
    let idx = 0;
    temp.y = -50;
    let list = GameLogic.Instance.getPopMsgList();
    DebugUtils.Log("===========setTipAni===========", list);
    let t0 = cc.tween(temp).to(0, { opacity: 0 });
    let t1 = cc.tween(temp).by(1, { position: cc.v3(0, 50, 0), opacity: 255 }); //向下运动
    let t2 = cc.tween(temp).delay(1);
    let t3 = cc.tween(temp).by(1, { position: cc.v3(0, 50, 0), opacity: -255 }); //向下运动
    let t4 = cc.tween(temp).by(1, { position: cc.v3(0, -100, 0) }); //向下运动
    let t5 = cc.tween(temp).delay(1);
    let t6 = cc.tween(temp).call(() => {
      let item = list[idx];
      if (item) {
        let name = item.nickname;
        let num = item.reward || 0;
        let des = `<color=#ffffff>${Lngs.MsgPop1} </c><color=#ffffff>${name}</color><color=#ffffff> ${Lngs.MsgPop2}${num}${Lngs.MsgPop3}</c>`;
        temp.getComponent(cc.RichText).string = des;
        idx++;
        idx = idx % 3;
        // 更新位置
        let widget = temp.getComponent(cc.Widget);
        widget.updateAlignment();
      }
    });
    cc.Tween.stopAllByTarget(temp);
    cc.tween(temp).sequence(t0, t1, t2, t3, t4, t5, t6).repeatForever().start();
  }

  // 跟新按钮状态
  private updateBtnStatus() {
    this.updateBtnsStatus(true);
  }

  // 设置声音按钮的图片状态
  private setBtnViceSp(): void {
    let value = localStorage.getItem("GAME_SOUND_MUTE");
    // DebugUtils.Log("==========setBtnViceSp设置声音按钮的图片状态==============", value);
    let v = parseInt(value);
    let path = v === 1 ? "home_voice_close" : "home_voice_open";
    GameUtils.SetSpData(AbNames.Atals1, Atals1Cfg.HomeCom, path, this.sp_voice);
  }

  /**
   * 设置下注按你的点击状态，方式狂点
   * @param isClick  false 禁用 true 可以使用
   */
  private setAtkBtnStatus(isClick: boolean): void {
    // let btn_atk500 = this.ViewComponent("node/btns/btn4", cc.Button) as cc.Button;
    // let btn_atk2500 = this.ViewComponent("node/btns/btn5", cc.Button) as cc.Button;
    // let btn_atk5000 = this.ViewComponent("node/btns/btn6", cc.Button) as cc.Button;
    // let btns = [btn_atk500, btn_atk2500, btn_atk5000];
    // for (let i = 0; i < btns.length; i++) {
    //     let temp = btns[i];
    //     temp.interactable = isClick;
    // }
  }

  /**
   * 设置血量显示
   * @param hpCur 当前血量
   * @param hpMax 最大血量
   */
  private setHpStatus(hpCur: number = 0, hpMax: number = 0): void {
    DebugUtils.Error("===========setHpStatus===========", hpCur, hpMax);
    this.lab_hp.string = `${hpCur}/${hpMax}`;
    let pre = hpCur / hpMax || 0;
    let s = this.view["node/home_hp/barBg"].getContentSize();
    let w = s.width;
    //
    this.hpAniNode.setContentSize(pre * w, s.height);
    if (this.pro_hpbar) {
      this.pro_hpbar.fillRange = pre;
    }
    if (this.hpPro) {
      this.hpPro.progress = pre;
    }
  }

  /**
   *
   * @param type 0 银 1金 2钻
   * @param num 宝箱数量
   */
  private setBoxStatus(type: BoxType, num: number): void {
    let box_y = this.view["node/btns/btn9/bg"]; //银宝箱
    let box_j = this.view["node/btns/btn8/bg"]; //金宝箱
    let box_z = this.view["node/btns/btn7/bg"]; //钻石宝箱

    let temp: cc.Node = null;
    if (type === BoxType.Box_BY) {
      box_y.active = num > 0 ? true : false;
      temp = box_y;
    } else if (type === BoxType.Box_HJ) {
      box_j.active = num > 0 ? true : false;
      temp = box_j;
    } else if (type === BoxType.Box_ZS) {
      box_z.active = num > 0 ? true : false;
      temp = box_z;
    }
    if (temp && num && num > 0) {
      let lab = temp.getComponentInChildren(cc.Label);
      lab.string = num.toString();
    }
  }

  /**
   * 设置下注的按钮数字
   * @param type
   * @param num
   */
  private setAtkStatus(data: AttackInfo): void {
    let type = data.type;
    let num = data.price;
    let atk_500 = this.view["node/btns/btn4"]; //银宝箱
    let atk_2500 = this.view["node/btns/btn5"]; //金宝箱
    let atk_5000 = this.view["node/btns/btn6"]; //钻石宝箱

    let temp: cc.Node = null;
    if (type === AtkType.Atk_500) {
      temp = atk_500;
    } else if (type === AtkType.Atk_2500) {
      temp = atk_2500;
    } else if (type === AtkType.Atk_5000) {
      temp = atk_5000;
    }
    if (temp && num && num > 0) {
      let lab = temp.getComponentInChildren(cc.Label);
      lab.string = `${num}${Lngs.TextPMQ}`;
    }
  }

  /**
   * 设置攻击动效
   * @param data
   */
  private async setAtkAni(data: AttackResponse) {
    let atkType = data.attackType;
    let reward = data.reward; //奖励的破魔石
    // DebugUtils.Log("=========onUIEventShowAtkAni============", atkType);
    let pre = null;

    this.createAtkAni(atkType);
    DebugUtils.Log("=========Atk_5000111==========", pre);

    // 播放提示条
    // reward = 50; //测试
    if (reward > 0) {
      let temp = this.addBetArea;
      let pre2 = NodePoolMgr.Instance.GetNodeInPool(AbNames.Prefabs, ResCfg.Prefabs.addBetItem);
      let item2 = cc.instantiate(pre2);
      if (item2) {
        temp.addChild(item2);

        let lab = item2.getComponentInChildren(cc.Label);
        lab.string = `+${reward}`;
        let item2Size = item2.getContentSize();
        let size = temp.getContentSize();
        let randamx = RandomUtils.getRandomInt(-size.width / 2, size.width / 2);
        randamx =
          randamx > 0
            ? randamx - item2Size.width / 2
            : randamx + item2Size.width / 2;
        // DebugUtils.Log("=============rewardreward==============", randamx);
        let randamY = -size.height / 2;
        item2.setPosition(randamx, randamY);

        let mashH = RandomUtils.getRandomInt(0, size.height / 2);
        let offsetH = size.height / 2 + mashH;
        let t = cc.tween;
        t(item2)
          .by(0.75, { position: cc.v3(0, offsetH, 0) })
          .delay(0.75)
          .to(0.5, { opacity: 0 })
          .call(() => {
            NodePoolMgr.Instance.PutNodeInPool(AbNames.Prefabs, ResCfg.Prefabs.addBetItem, item2);
          })
          // .removeSelf()
          .start();
      }
    }
  }

  // 点击返回
  private onBtnBackClick(): void {
    GameApp.Instance.onExitGame();
  }

  // 排行榜
  private onBtnRankClick(button: cc.Button) {
    this.updateBtnsStatus(false);
    let parent = UIMgr.Instance.GetParent(UILayer.UI_Layer2);
    UIMgr.Instance.ShowUIViewAsync(ResCfg.Prefabs.Rank, AbNames.Prefabs, parent);
  }

  // 中奖记录
  private onBtnRecordClick(button: cc.Button) {
    this.updateBtnsStatus(false);
    let parent = UIMgr.Instance.GetParent(UILayer.UI_Layer2);
    UIMgr.Instance.ShowUIViewAsync(ResCfg.Prefabs.Record, AbNames.Prefabs, parent);
  }

  // 活动说明
  private onBtnHelpClick(button: cc.Button) {
    this.updateBtnsStatus(false);

    // 请求配置数据
    let parent = UIMgr.Instance.GetParent(UILayer.UI_Layer2);
    UIMgr.Instance.ShowUIViewAsync(ResCfg.Prefabs.HomeMenu, AbNames.Prefabs, parent);
  }

  // 点击500攻击
  private onAddBet1Click(button: cc.Button): void {
    this.updateBtnsStatus(false);
    this.onAtkClick(AtkType.Atk_500, button);
  }

  // 点击2500攻击
  private onAddBet2Click(button: cc.Button): void {
    this.updateBtnsStatus(false);
    this.onAtkClick(AtkType.Atk_2500, button);
  }

  // 点击5000攻击
  private onAddBet3Click(button: cc.Button): void {
    this.updateBtnsStatus(false);
    this.onAtkClick(AtkType.Atk_5000, button);
  }

  // 点击攻击
  private async onAtkClick(atkType: AtkType, button: cc.Button) {
    if (this.gameStatus === GameStatus.Normal) {
      // 请求攻击，判断破魔石是否充足
      let cost = GameLogic.Instance.getCostByType(atkType);
      let have = GameLogic.Instance.getExorcismVoucher();
      DebugUtils.Log("==========onAtkClick============", cost, have);
      if (have < cost) {
        await UIMgr.Instance.ShowUIViewAsync(
          ResCfg.Prefabs.Nan,
          AbNames.Prefabs
        );
        this.updateBtnsStatus(true);
      } else {
        GameLogic.Instance.startAtk(atkType);
      }
    } else if (this.gameStatus === GameStatus.FuHuo) {
      this.updateBtnsStatus(true);
      CocosUtils.showToast(Lngs.BossDied, 0);
    }
  }

  // 点击银宝箱
  private async onBtnBox1Click(buttton: cc.Button) {
    console.log("==========Home_Ctrl.onBtnBox1Click===========");
    this.updateBtnsStatus(false);
    await this.showOpenBox(BoxType.Box_BY);
  }

  // 点击金宝箱
  private async onBtnBox2Click(buttton: cc.Button) {
    this.updateBtnsStatus(false);
    await this.showOpenBox(BoxType.Box_HJ);
  }

  // 点击钻宝箱
  private async onBtnBox3Click(buttton: cc.Button) {
    this.updateBtnsStatus(false);
    await this.showOpenBox(BoxType.Box_ZS);
  }

  /**
   * 展示宝箱
   * @param type 宝箱类型
   */
  private async showOpenBox(type: number) {
    let num = GameLogic.Instance.GetBoxByType(type);
    SoundMgr.Instance.playSound(this.audioClip_btn);
    if (num && num > 0) {
      let item: BoxInfo = {
        type: type,
        num: num,
      };
      let parent = UIMgr.Instance.GetParent(UILayer.UI_Layer2);
      let com = (await UIMgr.Instance.ShowUIViewAsync(
        ResCfg.Prefabs.EndOpen,
        AbNames.Prefabs,
        parent
      )) as EndOpen_Ctrl;
      com.setData(item);
    } else {
      // 展示配置
      CocosUtils.showToast(Lngs.BoxNan, 0);
      GameApp.Instance.showGameBoxCfgUI(2);
    }
  }

  // 点击加号
  private onBtnAddClick(): void {
    EventMgr.Instance.Emit(EventKey.UI_ShowShopMoney, "");
  }

  //点击音效
  private onVoiceClick(button: cc.Button): void {
    let value = localStorage.getItem("GAME_SOUND_MUTE");
    let v = parseInt(value);
    let isOpen = v === 0 ? true : false;
    DebugUtils.Log(
      "=====================onVoiceClick=====================",
      value,
      isOpen
    );
    SoundMgr.Instance.setSoundsMute(isOpen);
    SoundMgr.Instance.setMusicMute(isOpen);
    // GameLogic.Instance.playBgMusic();
    this.setBtnViceSp();
  }

  // 触摸事件
  private onTouchStart(touch: cc.Event.EventTouch): void {
    let screenPos = touch.getLocation();
    // DebugUtils.Log("================onTouchStart==============", screenPos);
    if (screenPos.y <= 1500) {
      let worldPos = new cc.Vec3(screenPos.x, screenPos.y, 0);
      let targetPos = this.node.convertToNodeSpaceAR(worldPos);
      EventMgr.Instance.Emit(EventKey.UI_ClickAni, targetPos);
    }
    return;
  }

  // enterhome 返回
  private onHttpMsgEnterHomeRes(unam: string, udata: HomeResponse): void {
    DebugUtils.Log(
      "=====================Home_Ctrl.onHttpMsgEnterHomeRes=========================="
    );
    if (udata) {
      let blude = udata.blood || 0;
      let bludeMax = udata.maxBlood || 0;
      if (blude <= 0) {
        //复活状态
        this.gameStatus = GameStatus.FuHuo;
        DebugUtils.Log("=========复活状态==========");
        this.status_fh.active = true;
        this.boss.active = false;
        // 设置复活数据
        let timeLast = udata.respawnTimer;
        let timeNext = udata.respawnAt;
        this.showFHData(timeLast, timeNext);
        this.showHPActive(false);
      } else {
        //非复活状态
        DebugUtils.Log("=========Boss状态==========");
        this.gameStatus = GameStatus.Normal;
        this.status_fh.active = false;
        this.boss.active = true;
        this.showHPActive(true);
      }
      this.setHpStatus(blude, bludeMax);

      // 更新宝箱数量
      let boxList = udata.boxList;
      if (boxList) {
        for (let i = 0; i < boxList.length; i++) {
          let temp: BoxInfo = boxList[i];
          this.setBoxStatus(temp.type, temp.num);
        }
      }

      let attackList = udata.attackList;
      if (attackList) {
        for (let i = 0; i < attackList.length; i++) {
          let temp: AttackInfo = attackList[i];
          this.setAtkStatus(temp);
        }
      }
    }
  }

  //攻击返回
  private onHttpMsgAtkRes(uname: string, udata: AttackResponse): void {
    DebugUtils.Log("===========onHttpMsgAtkRes===========");
    if (udata) {
      // 更新破魔券
      this.setPMSNum();

      // 长链接会更新,这里也更新一下
      let hp = GameLogic.Instance.curHp;
      let max = GameLogic.Instance.maxHp;
      this.setHpStatus(hp, max);

      // 展示攻击的动效
      this.setAtkAni(udata);
    }
    this.updateBtnsStatus(true);
  }

  // 开宝箱返回
  private async onHttpMsgOpenBoxRes(uname: string, udata: OpenBoxResponse) {
    // DebugUtils.Log("===========onHttpMsgOpenBoxRes111===========");
    if (udata) {
      // 更新Home 页面的宝箱数据
      this.setBoxStatus(udata.type, udata.num);
      // 展示奖励页面
      let type = udata.type;
      let num = GameLogic.Instance.GetBoxByType(type);
      if (num !== undefined || num !== null) {
        // DebugUtils.Log("===========onHttpMsgOpenBoxRes===========", num);
        let audio = (await ResMgrAsync.Instance.IE_GetAsset(
          AbNames.Sounds,
          ResCfg.VoiceCfg.get_box,
          cc.AudioClip
        )) as cc.AudioClip;
        if (audio) {
          SoundMgr.Instance.playSound(audio);
        } else {
          DebugUtils.Log("======礼物音效错误======");
        }
        // // 测试数据
        // udata.giftList = [
        //     {
        //         "giftId": 1600074222,
        //         "giftPrice": 50000,
        //         "giftName": "伐魔礼物1",
        //         "image": "https://oss-test.liveboxs.live/admin/other/CWT_U3CFwC7Cp8BLX1uWb1756354617972.png",
        //         "num": 1
        //     },
        //     {
        //         "giftId": 1600074224,
        //         "giftPrice": 20000,
        //         "giftName": "魔法扫把1",
        //         "image": "https://oss-test.liveboxs.cn/admin/other/item_071758168004097.png",
        //         "num": 2
        //     }
        // ];
        DebugUtils.Log(
          "====================Home_Ctrl.onHttpMsgOpenBoxRes===================",
          num
        );
        let parent = UIMgr.Instance.GetParent(UILayer.UI_Layer2);
        if (num <= 0) {
          //奖励全部开完
          DebugUtils.Log(
            "====================Home_Ctrl.onHttpMsgOpenBoxRes1==================="
          );
          let com = (await UIMgr.Instance.ShowUIViewAsync(
            ResCfg.Prefabs.EndGetBox,
            AbNames.Prefabs,
            parent
          )) as EndGetBox_Ctrl;
          com.setData(udata.giftList, type);
        } else {
          //开了部分的
          DebugUtils.Log(
            "====================Home_Ctrl.onHttpMsgOpenBoxRes2==================="
          );
          let com = (await UIMgr.Instance.ShowUIViewAsync(
            ResCfg.Prefabs.EndGetBox2,
            AbNames.Prefabs,
            parent
          )) as EndGetBox2_Ctrl;
          com.setData(udata.giftList[0], type);
        }
      }
    }
  }

  //更新boss信息
  private onWsEventUpdateBoss(uname: string, udata: any): void {
    let data = udata["demonSlayingBossStatus"] as protoGame.IBossStatus;
    DebugUtils.Log("=======onWsEventUpdateBoss=======", data);
    //更新血条
    let blude = data.blood || 0;
    let bludeMax = data.maxBlood || 0;
    this.setHpStatus(blude, bludeMax);

    if (blude > 0) {
      //boss 未死亡
      this.boss.active = true;
      this.status_fh.active = false;
      this.gameStatus = GameStatus.Normal;
      this.showHPActive(true);
    } else {
      //boos 死亡
      this.gameStatus = GameStatus.FuHuo;
      // 设置复活数据
      let timeLast = data.respawnTimer;
      let timeNext = data.respawnAt;
      this.showFHData(timeLast, timeNext);
      this.showHPActive(false);
      // 显示动画
      cc.Tween.stopAllByTarget(this.boss);
      cc.tween(this.boss)
        .to(0.5, { opacity: 0 })
        .call(() => {
          // DebugUtils.Log("=======onWsEventUpdateBoss显示Boss 死亡信息=========");
          this.boss.active = false;
          this.boss.opacity = 255;
          this.status_fh.active = true;
        })
        .start();
    }
  }

  // Boss 死亡弹出宝箱
  private onWsEventRewardBox(uname: string, udata: any): void {
    let arr = [BoxType.Box_BY, BoxType.Box_HJ, BoxType.Box_ZS];
    for (let i = 0; i < arr.length; i++) {
      let type = arr[i];
      let num = GameLogic.Instance.GetBoxByType(type);
      this.setBoxStatus(type, num);
    }
  }
}
