import EventMgr from "../../../../Framework/Managers/EventMgr";
import UIBase from "../../../../Framework/Managers/UIBase";
import DebugUtils from "../../../../Framework/Utils/DebugUtils";
import GameUtils from "../../../../Framework/Utils/GameUtils";
import { EventKey } from "../../../Config/EventCfg";
import { AbNames, Atals1Cfg, Lngs } from "../../../Config/GameConfig";
import {
  BoxInfo,
  BoxType,
  OpenBoxRequest,
  OpenBoxResponse,
} from "../../../Config/MsgCfg";
import GameApp from "../../../GameApp";
import GameLogic from "../../../GameLogic";

const { ccclass, property } = cc._decorator;
/**
 * 点击按宝箱弹出的宝箱按钮
 */
@ccclass
export default class EndOpen_Ctrl extends UIBase {
  sp_icon: cc.Sprite;
  lb_num: cc.Label;
  lab_des: cc.Label;
  btn1: any;
  sp_bnt2: cc.Sprite;
  reqData: OpenBoxRequest = {};

  onLoad() {
    super.onLoad();
    this.initUI();
    this.initData();

    EventMgr.Instance.AddEventListener(EventKey.Http_Res_OpenBoxRes, this, this.onHttpMsgOpenBoxRes);
  }

  start() {
    this.RunAnimation("node/bg");
    EventMgr.Instance.Emit(EventKey.UI_UpadteBtnStatus, "");
  }

  protected onDestroy(): void {
    EventMgr.Instance.RemoveListenner(EventKey.Http_Res_OpenBoxRes, this, this.onHttpMsgOpenBoxRes);
  }

  private initUI(): void {
    this.sp_icon = this.ViewComponent("node/bg/sp_bg/sp_icon_di/sp_icon", cc.Sprite) as cc.Sprite;
    this.lb_num = this.ViewComponent("node/bg/sp_bg/labs/lab_num", cc.Label) as cc.Label;
    this.lab_des = this.ViewComponent("node/bg/sp_bg/labs/lab_des", cc.Label) as cc.Label;
    this.sp_bnt2 = this.ViewComponent("node/bg/sp_bg/btns/btn2", cc.Sprite) as cc.Sprite;
    this.btn1 = this.view["node/bg/sp_bg/btns/btn1"];

    this.AddButtonListener("node/bg/sp_bg/btns/btn1", this, this.onBtnOneClick);
    this.AddButtonListener("node/bg/sp_bg/btns/btn2", this, this.onBtnAllClick);
    this.AddButtonListener("node/bg/sp_bg/btnClose", this, this.onCloseBtn);
    this.AddButtonListener("node/bg/sp_bg/labCfg", this, this.onBoxCfgClick);
  }

  private initData(): void { }

  public setData(data: BoxInfo) {
    let type = data.type;
    if (type) {
      let path = "";
      let des = "";
      switch (type) {
        case BoxType.Box_BY:
          path = "end_icon_by";
          des = Lngs.EndOpen1;
          break;
        case BoxType.Box_ZS:
          path = "end_icon_zs";
          des = Lngs.EndOpen2;
          break;
        case BoxType.Box_HJ:
          path = "end_icon_hj";
          des = Lngs.EndOpen3;
          break;
        default:
          break;
      }

      GameUtils.SetSpData(AbNames.Atals1, Atals1Cfg.End, path, this.sp_icon);
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
    GameUtils.SetSpData(AbNames.Atals1, Atals1Cfg.End, path, this.sp_bnt2);
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
