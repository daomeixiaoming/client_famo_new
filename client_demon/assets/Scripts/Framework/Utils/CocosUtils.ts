import { AbNames, HelpDataItem, UICfg } from "../../Game/Config/GameConfig";
import { ResCfg } from "../../Game/Config/ResConfig";
import UIMgr from "../Managers/UIMgr";

/**
 * cocos 工具类
 */
export default class CocosUtils {
  /**
   * 使用网络图片
   * @param url
   * @param spriteNode
   */
  public static loadRemoteSprite(
    url: string,
    spriteNode: cc.Sprite,
    endCall?: Function
  ): void {
    cc.assetManager.loadRemote(url, (err, imageAsset: cc.Texture2D) => {
      if (err) {
        console.error("加载失败:", err);
        return;
      }
      const spriteFrame = new cc.SpriteFrame(imageAsset);
      spriteNode.spriteFrame = spriteFrame; // 设置到Sprite组件
      endCall && endCall();
    });
  }

  /**
   * 显示提示条
   * @param des
   * @param status 状态
   */
  public static async showToast(des: string, status: number = 1) {
    let parent = cc.find("Canvas/toast");
    let com = await UIMgr.Instance.ShowUIViewAsync(
      ResCfg.Prefabs.Toast,
      AbNames.Prefabs
    );
    com.setData(des, status);
  }

  /**
   * 测试提取CSS 类型的数据
   * @param cssdata
   * @returns
   */
  public static getDataFromCSS(cssdata: string): HelpDataItem[] {
    let res: HelpDataItem[] = [];
    // let temp: HelpDataItem = {
    //         des: "活動說明",
    //         color: "255,238,0",
    //     }
    // res.push(temp);

    //返回所有匹配的 span 标签及内容
    const textMatches = cssdata.match(/<span[^>]*>(.*?)<\/span>/g);
    // DebugUtils.Log(textMatches);
    for (let i = 0; i < textMatches.length; i++) {
      let htmlString = textMatches[i];
      let textMatch = htmlString.match(/<span[^>]*>(.*?)<\/span>/);

      let temp: HelpDataItem = {
        des: "",
        color: "",
      };

      // 得到的数据
      let desData = textMatch ? textMatch[1] : "未匹配到内容";
      // DebugUtils.Log("数据 ", desData);
      temp.des = desData;

      let colorMatch = htmlString.match(
        /color:\s*(rgb\([^)]+\)|#[a-fA-F0-9]+|\w+)/i
      );
      let colorValue = colorMatch ? colorMatch[1] : null;
      if (colorValue) {
        colorValue = colorValue.replace("rgb", "");
        colorValue = colorValue.replace("(", "");
        colorValue = colorValue.replace(")", "");
        // let arr = colorValue.split(',');
        // let colorCur = new cc.Color(Number(arr[0]), Number(arr[1]), Number(arr[2]));
        temp.color = colorValue;
      }
      // DebugUtils.Log("颜色 ", colorValue);
      res.push(temp);
    }

    return res;
  }

  // 加载图集
  public static loadAtalsList(): void {}

  //格式化万
  public static formatNum(num: number, fixed: number = 2): string {
    // 参数校验
    if (typeof num !== "number" || isNaN(num)) {
      return "0";
    }
    let des = "";
    if (num < 10000000000) {
      return num.toFixed(fixed);
    } else {
      let formattedNum = (num / 10000000000).toFixed(fixed);
      des = `${formattedNum}百亿`;
    }
    return des;
  }
}
