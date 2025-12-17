import UIBase from "../../../../Framework/Managers/UIBase";

const { ccclass, property } = cc._decorator;
/**
 * 通用提示条
 */
@ccclass
export default class Toast_Ctrl extends UIBase {
  labDes: cc.Label;
  bg: cc.Node;
  tog: cc.Toggle;
  onLoad() {
    super.onLoad();
    this.initUI();
  }

  start() {
    this.bg.y = 1000 / 2;
    cc.tween(this.bg)
      .by(0.25, { position: cc.v3(0, 100 * 2 - 100, 0) })
      .delay(1)
      .to(0.5, { opacity: 0 })
      .call(() => {
        this.node.destroy();
      })
      .start();
  }

  private initUI(): void {
    this.labDes = this.ViewComponent("node/bg/lab", cc.Label) as cc.Label;
    this.bg = this.view["node/bg"] as cc.Node;

    this.tog = this.ViewComponent("node/bg/tog", cc.Toggle) as cc.Toggle;
  }

  /**
   *
   * @param des
   * @param status 1 true 2 false 0 不显示
   */
  public setData(des: string, status: number): void {
    this.labDes.string = des;
    this.tog.node.active = true;
    if (status === 1) {
      this.tog.isChecked = true;
    } else if (status == 2) {
      this.tog.isChecked = false;
    } else {
      this.tog.node.active = false;
    }
  }
}
