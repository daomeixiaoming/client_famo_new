import DebugUtils from "../../Framework/Utils/DebugUtils";
import { ResCfg } from "../Config/ResConfig";
import GameApp from "../GameApp";

const { ccclass, property } = cc._decorator;

export const AniType = {
  Ani_Click: "Ani_Click",
  Ani_Atk500: "Ani_Atk500",
  Ani_Atk2500: "Ani_Atk2500",
  Ani_Atk5000: "Ani_Atk5000",
};

@ccclass
export default class AniEvent extends cc.Component {
  public ani_type: string;
  @property(sp.Skeleton)
  spine: sp.Skeleton = null;

  onLoad() {
    this.ani_type = AniType.Ani_Click;
  }

  protected onDestroy(): void {
    console.warn("===========AniEvent.onDestroy============");
    if (this.spine) {
      // this.spine.clearTracks();
      this.spine = null;
    }
  }

  start() {
    // 监听Spine事件
    this.spine = this.node.getComponent(sp.Skeleton);

    if (!this.spine) {
      console.error("Spine component is null!");
      return;
    }

    if (this.spine) {
      // 清理所有播放队列的动画
      // this.spine.clearTracks();
      // // 指定管道的索引
      // this.spine.clearTrack(0);

      // this.spine.setEventListener((trackEntry, event) => {
      //   // event.data.name 是事件名称，事件参数在event.data中，具体参数取决于在Spine中设置的事件数据
      //   const eventName = event.data.name;
      //   console.log("===========setEventListener============", eventName);
      //   // this.node.destroy();
      //   // if (
      //   //   eventName === "ani_end" ||
      //   //   eventName === "atk_500" ||
      //   //   eventName === "on_atk_2500" ||
      //   //   eventName === "on_atk_5000"
      //   // ) {
      //   //   this.node.destroy();
      //   // }
      //   // // 可以添加更多事件判断
      // });

      // this.spine.setEndListener(() => {
      //   console.warn("=============setEndListener==============");
      //   this.node.destroy();
      // });

      this.spine.setCompleteListener(() => {
        console.warn("=============setCompleteListener==============");
        // this.spine.clearTracks();
        this.node.destroy();
      });
    }
  }

  public initData(type: string = AniType.Ani_Click) {
    this.ani_type = type;

    let audioPath = null;
    if (type === AniType.Ani_Atk500) {
      audioPath = ResCfg.VoiceCfg.atk_500;
    } else if (type === AniType.Ani_Atk2500) {
      audioPath = ResCfg.VoiceCfg.atk_2500;
    } else if (type === AniType.Ani_Atk5000) {
      audioPath = ResCfg.VoiceCfg.atk_5000;
    }
    if (audioPath) {
      //播放音效
      GameApp.Instance.playEffectAudio(audioPath);
    }
  }

  atk_500_end() {
    DebugUtils.Log("===============AniEvent atk_500_end===============");
  }

  //动画结束事件
  on_ani_end_event() {
    // DebugUtils.Log(
    //   "===============AniEvent on_ani_end_event===============",
    //   this.ani_type
    // );
    // let node: cc.Node = this.node;
    // if (this.ani_type === AniType.Ani_Click) {
    //   // DebugUtils.Log("===============AniEvent on_ani_end_event= Ani_Click==============")
    //   node.destroy();
    // } else if (this.ani_type === AniType.Ani_Atk500) {
    //   // DebugUtils.Log("===============AniEvent on_ani_end_event= Ani_Click= Ani_Atk500=============")
    //   // node.destroy();
    // } else if (this.ani_type === AniType.Ani_Atk2500) {
    //   // DebugUtils.Log("===============AniEvent on_ani_end_event= Ani_Click= spAddBet2500=============")
    //   // node.destroy();
    // } else if (this.ani_type === AniType.Ani_Atk5000) {
    //   // DebugUtils.Log("===============AniEvent on_ani_end_event= Ani_Click= Ani_Atk5000=============")
    //   // node.destroy();
    // }
  }
}
