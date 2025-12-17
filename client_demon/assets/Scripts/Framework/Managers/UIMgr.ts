import { AbNames } from "../../Game/Config/GameConfig";
import DebugUtils from "../Utils/DebugUtils";
import { ResMgr } from "./ResMgr";
import { ResMgrAsync } from "./ResMgrAsync";

const { ccclass, property } = cc._decorator;

export const UILayer = {
  UI_Base: 1, //全屏 root 节点
  UI_Layer2: 2, //非全屏 root1节点
  UI_Layer3: 3, //非全屏 root2节点
  UI_Toast: 4, //弹框
};

@ccclass
export default class UIMgr extends cc.Component {
  public static Instance: UIMgr = null as unknown as UIMgr;

  private canvas: cc.Node = null as unknown as cc.Node;
  root: cc.Node;

  onLoad(): void {
    if (UIMgr.Instance === null) {
      UIMgr.Instance = this;
    } else {
      this.destroy();
      return;
    }

    // 挂我们的UI视图的一个根节点;
    this.canvas = cc.find("Canvas") as cc.Node;

    // 挂在UI界面的节点
    this.root = cc.find("Canvas/root") as cc.Node;

    // 特殊的挂载点, ....
    // end
  }

  public GetParent(type: number): cc.Node {
    let parent = null;
    if (type === UILayer.UI_Layer2) {
      parent = cc.find("Canvas/root1"); //
    } else if (type === UILayer.UI_Layer3) {
      parent = cc.find("Canvas/root2"); //
    }
    if (parent) {
      parent.destroyAllChildren();
    }
    return parent;
  }

  // 显示一个UI到我们的视图上面;
  /**
   *
   * @param viewName
   * @param parent
   * @returns 返回脚本组件
   */
  public ShowUIView(
    viewName: string,
    abName: string = AbNames.Prefabs,
    parent?: cc.Node
  ): any {
    // 实例化UI视图出来;
    var uiPrefab = ResMgr.Instance.getAsset(abName, viewName, cc.Prefab);
    if (!uiPrefab) {
      DebugUtils.Log("cannot find ui Prefab: ", viewName);
      return;
    }

    var uiView: cc.Node = cc.instantiate(uiPrefab) as cc.Node;
    parent = !parent ? this.root : parent;

    // DebugUtils.Log(uiView);

    let arr = viewName.split("/");
    let pathNam = arr[arr.length - 1];
    let temp = pathNam + "_Ctrl";
    //往根节点上挂下UI视图脚本;;
    let com = uiView.getComponent(temp);
    if (!com) {
      uiView.addComponent(temp);
    }
    com = uiView.getComponent(temp);
    parent.addChild(uiView);
    return com;
  }

  /**
   * 异步加载资源
   * @param viewName
   * @param abName
   * @param parent
   * @returns
   */
  public async ShowUIViewAsync(
    viewName: string,
    abName: string = AbNames.Prefabs,
    parent?: cc.Node
  ) {
    // DebugUtils.Log("==========ShowUIViewAsync1============");
    var uiPrefab = (await ResMgrAsync.Instance.IE_GetAsset(
      abName,
      viewName,
      cc.Prefab
    )) as cc.Prefab;
    if (!uiPrefab) {
      console.error("cannot find ui Prefab: ", viewName);
      return;
    }
    var uiView: cc.Node = cc.instantiate(uiPrefab) as cc.Node;
    parent = !parent ? this.root : parent;
    // DebugUtils.Log("==========ShowUIViewAsync2============");

    let arr = viewName.split("/");
    let pathNam = arr[arr.length - 1];
    let temp = pathNam + "_Ctrl";
    //往根节点上挂下UI视图脚本;;
    let com = uiView.getComponent(temp);
    if (!com) {
      uiView.addComponent(temp);
    }
    com = uiView.getComponent(temp);
    parent.addChild(uiView);
    return com;
  }

  /**
   * 销毁节点
   * @param viewName
   * @param parent
   */
  public DestroyView(viewName: string, parent?: cc.Node): void {
    parent = !parent ? this.root : parent;

    let arr = viewName.split("/");
    let pathNam = arr[arr.length - 1];
    let node = parent.getChildByName(pathNam);
    if (node) {
      node.destroy();
    }
  }
}
