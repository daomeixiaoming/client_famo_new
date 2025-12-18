import { AbNames } from "../../Game/Config/GameConfig";
import { ResCfg } from "../../Game/Config/ResConfig";
import { ResMgr } from "./ResMgr";
import { ResMgrAsync } from "./ResMgrAsync";
import SoundMgr from "./SoundMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIBase extends cc.Component {
    // 动画节点
    private aniNode: cc.Node = null;

    protected view: any = {}; // 路径--->节点; this.view["路径"] --->获得节点;
    protected audioClip_btn: cc.AudioClip = null; //按钮点击的音效

    private loadAllNodeInView(root: any, path: string) {
        for (let i = 0; i < root.children.length; i++) {
            this.view[path + root.children[i].name] = root.children[i];
            this.loadAllNodeInView(root.children[i], path + root.children[i].name + "/");
        }
    }

    onLoad(): void {
        // 遍历它下面所有的孩子，然后将所有的节点路径---》节点对象生成到view表里面;
        this.loadAllNodeInView(this.node, "");

        this.aniNode = this.view["node/bg"];

        this.init();
    }

    private async init() {
        this.audioClip_btn = await ResMgrAsync.Instance.IE_GetAsset(AbNames.Sounds, ResCfg.VoiceCfg.click, cc.AudioClip) as cc.AudioClip;
    }

    /**
     * 按钮的点击事件
     * @param viewName 按钮名字
     * @param caller  this
     * @param func 回调
     * @param isAddVoide 是否添加点击音效
     * @returns 
     */
    public AddButtonListener(viewName: string, caller: any, func: any, isAddVoide: boolean = true) {
        var view_node: cc.Node = this.view[viewName];
        if (!view_node) {
            return;
        }

        var button = view_node.getComponent(cc.Button);
        if (!button) {
            return;
        }

        view_node.on("click", function (button: cc.Button) {
            // DebugUtils.Log("========播放声音=========");
            if (this.audioClip_btn) {
                // DebugUtils.Log("============playEffectAudio=============", audioClip);
                // SoundMgr.Instance.playSound(this.audioClip_btn);
            }
            func && func.call(caller, button);
        }, caller);
    }

    public ViewComponent(path: string, assettype: any): any {
        let res = null;
        // DebugUtils.Log("=============ViewComponent===========",path);
        if (!this.view[path]) {
            console.error("==========ViewComponent========", path);
        } else {
            let com = this.view[path].getComponent(assettype);
            if (com) {
                res = com;
            }
        }

        return res;
    }
    // 关闭UI
    public onCloseBtn() {
        // DebugUtils.Log("==========UIBase.onCloseBtn=========");
        this.node.destroy();
    }

    // 播放启动动画
    public RunAnimation(path: string, call?: Function) {
        let node = this.view[path] as cc.Node;
        // node.scale = 0;
        node.active = false;
        cc.Tween.stopAllByTarget(node);
        cc.tween(node)
            .to(0, { scale: 0.1 })
            .call(() => {
                node.active = true;
            })
            .to(0.08, { scale: 1.1 })
            .to(0.1, { scale: 0.9 })
            .to(0.1, { scale: 1 }).call(
                () => {
                    // this.resetShootBtns();
                    call && call();
                }
            ).start();
    }

    public RunAnimation2(path: string, call?: Function) {
        let node = this.view[path] as cc.Node;
        let pos = node.getPosition();
        let width = node.getContentSize().width;
        cc.Tween.stopAllByTarget(node);
        cc.tween(node)
            .to(0, { scale: 0.1 })
            .to(0.25, { position: cc.v3(0, 0, 0) }, { easing: 'circInOut' })
            .call(
                () => {
                    // this.resetShootBtns();
                }
            ).start();
    }
}
