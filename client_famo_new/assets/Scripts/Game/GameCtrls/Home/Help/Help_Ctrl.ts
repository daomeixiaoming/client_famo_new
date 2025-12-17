import EventMgr from "../../../../Framework/Managers/EventMgr";
import UIBase from "../../../../Framework/Managers/UIBase";
import CocosUtils from "../../../../Framework/Utils/CocosUtils";
import { EventKey } from "../../../Config/EventCfg";
import { RewardResponse } from "../../../Config/MsgCfg";
import GameLogic from "../../../GameLogic";

const { ccclass, property } = cc._decorator;
/**
 * 活动说明
 */
@ccclass
export default class Help_Ctrl extends UIBase {
  labItem: cc.Node;
  scrollView: cc.ScrollView;
  excle: cc.Node;

  cellHeight: number = 80; //一行高
  row: number = 5;
  col: number = 5;
  cellWidth: number = 0; //线宽

  aniEndCall: Function = null; //开启动画结束动效

  onLoad() {
    super.onLoad();
    this.initUI();
  }

  start() {
    this.RunAnimation("node/bg", this.aniEndCall);
    let data = GameLogic.Instance.gameCfg;
    let data1 = GameLogic.Instance.gameRates;

    if (data && data1) {
      this.setData(data.regulation, data1);
    }

    // 更新按钮状态，防止狂点
    EventMgr.Instance.Emit(EventKey.UI_UpadteBtnStatus, "");
  }

  protected onDestroy(): void {
    this.aniEndCall = null;
  }

  private initUI(): void {
    this.AddButtonListener("node/bg/sp_bg/btn_close", this, this.onCloseBtn);

    this.labItem = this.view["node/bg/sp_bg/scrollView/view/labDes"] as cc.Node;
    this.labItem.active = false;
    this.scrollView = this.ViewComponent("node/bg/sp_bg/scrollView", cc.ScrollView) as cc.ScrollView;
    this.excle = this.view["node/bg/sp_bg/scrollView/view/excle"] as cc.Node;
    this.excle.active = false;
  }

  public setAniEndCall(callback: Function): void {
    // DebugUtils.Log("===============Help_Ctrl.setAniEndCall==================");
    this.aniEndCall = callback;
  }

  /**
   *
   * @param data 说明数据
   * @param data1 配置数据
   */
  private showList(data: any[], data1: RewardResponse): void {
    let content = this.scrollView.content;
    for (let i = 0; i < data.length; i++) {
      let temp = data[i];
      let des = temp["des"];

      if (des.indexOf("A1") !== -1) {
        let des1 = data1.maxBlood;
        des = des.replace("A1", des1);
      } else if (des.indexOf("A2") !== -1) {
        let des2 = data1.respawnTimer;
        des = des.replace("A2", des2);
      } else if (des.indexOf("A3") !== -1) {
        let dataTemp = data1.rankRewardConfigs[0];
        let min = dataTemp.minRank;
        let max = dataTemp.maxRank;
        let rank = min === max ? min.toString() : `${min}-${max}`;
        let des3 = rank;
        des = des.replace("A3", des3);
      } else if (des.indexOf("A5") !== -1) {
        let dataTemp = data1.rankRewardConfigs[1];
        let min = dataTemp.minRank;
        let max = dataTemp.maxRank;
        let rank = min === max ? min.toString() : `${min}-${max}`;
        let des5 = rank;
        des = des.replace("A5", des5);
      } else if (des.indexOf("A7") !== -1) {
        let dataTemp = data1.rankRewardConfigs[2];
        let min = dataTemp.minRank;
        let max = dataTemp.maxRank;
        let rank = min === max ? min.toString() : `${min}-${max}`;
        let des7 = rank;
        des = des.replace("A7", des7);
      }

      if (des.indexOf("A4") !== -1) {
        let dataTemp = data1.rankRewardConfigs[0];
        let type = dataTemp.type;
        let des4 = GameLogic.Instance.getDesByType(type);
        des = des.replace("A4", des4);
      } else if (des.indexOf("A6") !== -1) {
        let dataTemp = data1.rankRewardConfigs[1];
        let type = dataTemp.type;
        let des6 = GameLogic.Instance.getDesByType(type);
        des = des.replace("A6", des6);
      } else if (des.indexOf("A8") !== -1) {
        let dataTemp = data1.rankRewardConfigs[2];
        let type = dataTemp.type;
        let des8 = GameLogic.Instance.getDesByType(type);
        des = des.replace("A8", des8);
      }

      let item = cc.instantiate(this.labItem);
      item.active = true;
      content.addChild(item);
      item.getComponent(cc.Label).string = des;
      let arr = temp["color"].split(",");
      let color = new cc.Color(arr[0], arr[1], arr[2]);
      // item.color = color;
    }
  }

  // 画外框
  /**
   *
   * @param graphics
   * @param w
   * @param h
   * @param row
   * @returns
   */
  private drawTable1(graphics: cc.Graphics, w: number, h: number): void {
    if (!graphics) return;

    // 设置线条样式
    graphics.lineWidth = 8;
    graphics.strokeColor = cc.Color.BLACK;
    graphics.fillColor = cc.Color.BLACK;

    // 画外框
    let arr1 = [
      { start: cc.v2(-w / 2, h / 2), end: cc.v2(w / 2, h / 2) },
      { start: cc.v2(w / 2, h / 2), end: cc.v2(w / 2, -h / 2) },
      { start: cc.v2(w / 2, -h / 2), end: cc.v2(-w / 2, -h / 2) },
      { start: cc.v2(-w / 2, -h / 2), end: cc.v2(-w / 2, h / 2) },
    ];
    for (let i = 0; i < arr1.length; i++) {
      let temp = arr1[i];
      graphics.moveTo(temp["start"].x, temp["start"].y);
      graphics.lineTo(temp["end"].x, temp["end"].y);
    }

    // 应用绘制
    graphics.stroke();
  }

  /**
   * 绘制表格
   * @param graphics
   * @param w //宽
   * @param h //高
   * @param row //行数
   * @returns
   */
  private drawTable(
    graphics: cc.Graphics,
    w: number,
    h: number,
    row: number
  ): void {
    if (!graphics) return;

    // 设置线条样式
    graphics.lineWidth = 4;
    graphics.strokeColor = cc.Color.BLACK;
    graphics.fillColor = cc.Color.BLACK;

    // 画水平线
    for (let i = 0; i < row - 1; i++) {
      let offy = h / 2 - this.cellHeight - i * this.cellHeight;
      let start = cc.v2(-w / 2, offy);
      let end = cc.v2(w / 2, offy);
      graphics.moveTo(start.x, start.y);
      graphics.lineTo(end.x, end.y);
    }

    // 画垂直线
    let arr2 = [0.25, 0.5, 0.75];
    for (let i = 0; i < arr2.length; i++) {
      let offx = -w / 2 + w * arr2[i];
      let start = cc.v2(offx, h / 2);
      let end = cc.v2(offx, -h / 2);
      graphics.moveTo(start.x, start.y);
      graphics.lineTo(end.x, end.y);
    }

    // 应用绘制
    graphics.stroke();
  }

  private setData(data: string, data1: RewardResponse): void {
    // 解析css数据
    let des = CocosUtils.getDataFromCSS(data);
    this.showList(des, data1);
  }
}
