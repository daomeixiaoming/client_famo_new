import EventMgr from "../../../../Framework/Managers/EventMgr";
import { ResMgr } from "../../../../Framework/Managers/ResMgr";
import UIBase from "../../../../Framework/Managers/UIBase";
import DebugUtils from "../../../../Framework/Utils/DebugUtils";
import { EventKey } from "../../../Config/EventCfg";
import { AbNames, AtalsCfg, Lngs } from "../../../Config/GameConfig";
import {
  BoxInfo,
  BoxType,
  OpenBoxRequest,
  OpenBoxResponse,
} from "../../../Config/MsgCfg";
import { ResCfg } from "../../../Config/ResConfig";
import NetHttpMgr from "../../../Data/NetHttpMgr";
import GameApp from "../../../GameApp";
import GameLogic from "../../../GameLogic";

const { ccclass, property } = cc._decorator;
/**
 * 点击按宝箱弹出的宝箱按钮
 */
@ccclass
export default class EndOpen_Ctrl extends UIBase {
  sp_icon: cc.Sprite;
  atals: cc.SpriteAtlas;
  lb_num: cc.Label;
  lab_des: cc.Label;
  btn1: any;
  sp_bnt2: cc.Sprite;
  reqData: OpenBoxRequest = {};

  onLoad() {
    super.onLoad();
    this.initUI();
    this.initData();

    EventMgr.Instance.AddEventListener(
      EventKey.Http_Res_OpenBoxRes,
      this,
      this.onHttpMsgOpenBoxRes
    ); //1
  }

  start() {
    this.RunAnimation("node/bg");
    EventMgr.Instance.Emit(EventKey.UI_UpadteBtnStatus, "");
  }

  protected onDestroy(): void {
    EventMgr.Instance.RemoveListenner(
      EventKey.Http_Res_OpenBoxRes,
      this,
      this.onHttpMsgOpenBoxRes
    ); //1
  }

  private initUI(): void {
    this.sp_icon = this.ViewComponent(
      "node/bg/sp_bg/sp_icon",
      cc.Sprite
    ) as cc.Sprite;
    this.lb_num = this.ViewComponent(
      "node/bg/sp_bg/labs/lab_num",
      cc.Label
    ) as cc.Label;
    this.lab_des = this.ViewComponent(
      "node/bg/sp_bg/labs/lab_des",
      cc.Label
    ) as cc.Label;
    this.sp_bnt2 = this.ViewComponent(
      "node/bg/sp_bg/btns/btn2",
      cc.Sprite
    ) as cc.Sprite;
    this.btn1 = this.view["node/bg/sp_bg/btns/btn1"];

    this.atals = ResMgr.Instance.getAsset(
      AbNames.Atals_Home,
      AtalsCfg.Home,
      cc.SpriteAtlas
    ) as cc.SpriteAtlas;

    this.AddButtonListener("node/bg/sp_bg/btns/btn1", this, this.onBtnOneClick);
    this.AddButtonListener("node/bg/sp_bg/btns/btn2", this, this.onBtnAllClick);
    this.AddButtonListener("node/bg/sp_bg/btnClose", this, this.onCloseBtn);
    this.AddButtonListener("node/bg/sp_bg/labCfg", this, this.onBoxCfgClick);
  }

  private initData(): void {}

  public setData(data: BoxInfo) {
    let type = data.type;
    if (type) {
      let path = "";
      let des = "";
      switch (type) {
        case BoxType.Box_BY:
          path = "hoem_box1";
          des = Lngs.EndOpen1;
          break;
        case BoxType.Box_ZS:
          path = "hoem_box3";
          des = Lngs.EndOpen2;
          break;
        case BoxType.Box_HJ:
          path = "hoem_box2";
          des = Lngs.EndOpen3;
          break;
        default:
          break;
      }
      if (path !== "") {
        let sf = this.atals.getSpriteFrame(path);
        if (sf) {
          this.sp_icon.spriteFrame = sf;
        }
      }
      if (des !== "") {
        this.lab_des.string = des;
      }
    }

    let num = data.num;
    if (num) {
      this.lb_num.string = `${num}${Lngs.One}`;
    }

    this.btn1.active = num > 1 ? true : false;
    let path = num > 1 ? "end_btn_openall" : "end_btn_open";
    let sf = this.atals.getSpriteFrame(path);
    if (sf) {
      this.sp_bnt2.spriteFrame = sf;
    }

    this.reqData.type = type;
    this.reqData.num = num;
  }

  //开放一个
  private onBtnOneClick(): void {
    this.reqData.num = 1;
    this.openBoxReq();
  }

  // 开放全部
  private onBtnAllClick(): void {
    this.reqData.num = 65535;
    this.openBoxReq();
  }

  // 点击规则
  private async onBoxCfgClick() {
    GameApp.Instance.showGameBoxCfgUI();
  }

  //请求开宝箱
  private openBoxReq() {
    DebugUtils.Log("========EndOpen_Ctrl.openBoxReq=========", this.reqData);
    GameLogic.Instance.openBox(this.reqData);
  }

  private onHttpMsgOpenBoxRes(uname: string, udata: OpenBoxResponse) {
    this.node.destroy();
  }
}
