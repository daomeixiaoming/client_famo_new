import EventMgr from "../../Framework/Managers/EventMgr";
import { AbNames, Lngs, UICfg } from "../Config/GameConfig";
import { ShopData, ShopMoneyData } from "../Config/MsgCfg";
import { EventKey } from "../Config/EventCfg";
import RandomUtils from "../../Framework/Utils/RandomUtils";
import TimeUtils from "../../Framework/Utils/TimeUtils";
import GameLogic from "../GameLogic";
import UIMgr from "../../Framework/Managers/UIMgr";
import { ResCfg } from "../Config/ResConfig";
import CocosUtils from "../../Framework/Utils/CocosUtils";
import GameApp from "../GameApp";
import UIView from "../UIView";
import DebugUtils from "../../Framework/Utils/DebugUtils";

const { ccclass, property } = cc._decorator;

/**
 * 测试协议
 */
@ccclass
export default class GameTest extends cc.Component {
  private _idx: number = 0;
  listPopMsg = []; //跑马灯的测试数据
  onLoad() {
    this.listPopMsg = [];
    for (let i = 0; i < 50; i++) {
      let temp = {
        nickname: "用户_00" + (i + 1),
        reward: 50 + 50 * i,
      };
      this.listPopMsg.push(temp);
    }
  }

  onBtn1Click() {
    this.testBtn1Click();
  }

  onBtn2Click() {
    this.testBtn2Click();
  }

  onBtn3Click() {
    this.testBtn3Click();
  }

  onBtn4Click() {
    this.testBtn4Click();
  }

  onBtn5Click() {
    this.testBtn5Click();
  }

  onBtn6Click() {
    this.testBtn6Click();
  }

  onBtn7Click() {
    this.testBtn7Click();
  }

  // 破魔券商城
  private testBtn1Click(): void {
    let list = [];
    for (let i = 0; i < 20; i++) {
      let item: ShopMoneyData = {
        idx: i % 5,
        price: 10 * (1 + i),
        name: "宝箱" + (1 + i),
        num: 1,
      };
      list.push(item);
    }

    EventMgr.Instance.Emit(EventKey.TEST_ShopMoney, list);
  }

  // 伏魔券商城
  private testBtn2Click(): void {
    let list = [];
    for (let i = 0; i < 20; i++) {
      let item: ShopData = {
        price: 10 * (1 + i),
        name: "宝箱" + (1 + i),
        num: 1,
        icon: "",
      };
      list.push(item);
    }

    EventMgr.Instance.Emit(EventKey.TEST_Shop, list);
  }

  // 模拟攻击ws 消息广播
  private testBtn3Click(): void {
    let data = {
      demonSlayingBossStatus: {
        blood: 0,
        maxBlood: 0,
        respawnTimer: 90 * 60 * 1000, //剩余复活时间
        respawnAt: 1757930215722, //复活时间戳
      },
    };
    EventMgr.Instance.Emit(EventKey.WS_UpdateBoss, data);
  }

  // 收到新的广告条
  private testBtn4Click(): void {
    // 保存跑马灯数据
    let temp = RandomUtils.getRandomElement(this.listPopMsg);
    GameLogic.Instance.setPopMsgList(temp);
  }

  // 序列化与反序列化protobuf
  private async testBtn5Click() {
    DebugUtils.Log("=========protobuf 编码解码=========");

    let a = {
      a: 1,
    };
    let test = a["test"] | 0;
    DebugUtils.Log("=======test=======", test);
    // UIMgr.Instance.ShowUIView(UICfg.Nan, AbNames.Prefab_Home);
    // UIMgr.Instance.ShowUIView(UICfg.Notice, AbNames.Prefab_Notice);
    // await UIMgr.Instance.ShowUIViewAsync(ResCfg.Prefabs.Nan, AbNames.Prefabs);
    // CocosUtils.showToast(Lngs.BoxNan, 0);
    // let msg = {
    //     uname: "test1231",
    //     upwd: "123456456"
    // }
    // let buf1 = protoGame.UnameLoginReq.create(msg);
    // let buf = protoGame.UnameLoginReq.encode(buf1).finish();
    // DebugUtils.Log("========编码==========", buf);

    // let data = protoGame.UnameLoginReq.decode(buf);
    // DebugUtils.Log("========解码==========", data)

    // await UIMgr.Instance.ShowUIViewAsync(ResCfg.Prefabs.RewardPrice, AbNames.Prefabs);
    // GameApp.Instance.showGameBoxCfgUI(1);
    // CocosUtils.showToast("测试");
    UIView.Instance.showNotice(true);
  }

  private testBtn6Click(): void {
    GameApp.Instance.showGameBoxCfgUI(2);
  }

  private testBtn7Click() {
    // let totalMemInBytes = cc.sys.getTotalMemory();
    // let totalMemInMB = totalMemInBytes / (1024 * 1024); // 转换为MB
    // cc.log("Total JS Heap Memory: " + totalMemInMB.toFixed(2) + " MB");
    let res = cc.assetManager.assets;
    DebugUtils.Log("============TotalMemory==============", res);
  }
  // ------------------------------------------------------------------------------------------------------------------------------
}
