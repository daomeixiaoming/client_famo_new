import { ResMgr } from "../Framework/Managers/ResMgr";
import { ResMgrAsync } from "../Framework/Managers/ResMgrAsync";
import UIMgr from "../Framework/Managers/UIMgr";
import DebugUtils from "../Framework/Utils/DebugUtils";
import { AbNames, UICfg } from "./Config/GameConfig";
import { ResCfg } from "./Config/ResConfig";

const { ccclass, property } = cc._decorator;

// 主要用来展示界面
@ccclass
export default class UIView extends cc.Component {
  public static Instance: UIView = null as unknown as UIView;
  playNotice: cc.Node = null; //  玩法公告节点
  onLoad(): void {
    if (UIView.Instance === null) {
      UIView.Instance = this;
    } else {
      this.destroy();
      return;
    }
  }

  Init() { }

  public desAll() {
    // 销毁玩法公约节点
    if (this.playNotice) {
      this.playNotice.destroy();
      this.playNotice = null;
    }
  }
  /**
   * 展示玩法公告
   */
  public async showNotice(isActive: boolean) {
    DebugUtils.Log(
      "===========showNotice==============",
      isActive,
      this.playNotice
    );
    // if (this.playNotice) {
    //   this.playNotice.active = isActive;
    //   return;
    // }
    if (!isActive) {
      return;
    }
    //  加载玩法公告UI
    // if (!this.playNotice) {
    let com = await UIMgr.Instance.ShowUIViewAsync(ResCfg.Prefabs.Notice, AbNames.Prefabs);
    this.playNotice = com.node;
    this.playNotice.active = isActive;
    // }
  }

  public LoadHomeOpt() {

  }
}
