import GridListView from "../../../../Framework/Engine/GridListView";
import EventMgr from "../../../../Framework/Managers/EventMgr";
import { ResMgr } from "../../../../Framework/Managers/ResMgr";
import UIBase from "../../../../Framework/Managers/UIBase";
import UIMgr from "../../../../Framework/Managers/UIMgr";
import DebugUtils from "../../../../Framework/Utils/DebugUtils";
import { EventKey } from "../../../Config/EventCfg";
import { AbNames, AtalsCfg, UICfg } from "../../../Config/GameConfig";
import { BossHistoryItem, PageResultBossHistoryItem } from "../../../Config/MsgCfg";
import { ResCfg } from "../../../Config/ResConfig";
import NetHttpMgr from "../../../Data/NetHttpMgr";

const { ccclass, property } = cc._decorator;
/**
 * 伤害榜
 */
@ccclass
export default class RankPage3_Ctrl extends UIBase {
    scrollview: cc.ScrollView;
    pre: cc.Prefab;
    startPage: number = 1; //起始页
    item: cc.Node;
    atals: cc.SpriteAtlas;
    list: GridListView;
    infoList: any[] = [];

    onLoad() {
        super.onLoad();
        this.initUI();
        EventMgr.Instance.AddEventListener(EventKey.Http_Res_RankPage3, this, this.setListData3);
    }

    start() {
        this.getListData();
    }

    protected onDestroy(): void {
        EventMgr.Instance.RemoveListenner(EventKey.Http_Res_RankPage3, this, this.setListData3); //更新破魔券
    }

    private initUI(): void {
        this.scrollview = this.node.getComponent(cc.ScrollView);
        this.scrollview.node.on('scroll-to-bottom', this.onScrollToBottom, this);
        this.atals = ResMgr.Instance.getAsset(AbNames.Atals_Home, AtalsCfg.Home, cc.SpriteAtlas) as cc.SpriteAtlas;
    }

    private onScrollToBottom() {
        this.getListData();
    }

    // 请求数据
    private getListData() {
        NetHttpMgr.Instance.GetRankHurtList(this.startPage, 8);
    }

    private setListData3(uanme: string, udata: PageResultBossHistoryItem) {
        // DebugUtils.Log("=======RankPage3_Ctrl.setListData3=======", udata);
        if (udata) {
            let list = udata.list;
            if (this.startPage === 1 && list.length === 0) {
                EventMgr.Instance.Emit(EventKey.UI_RankNanData, "");
                return;
            }

            if (list.length === 0) {
                DebugUtils.Log("=======数据已经到是最后的！=======");
            }
            this.createItem(list);
            this.startPage++;
        }
    }

    private async createItem(list: BossHistoryItem[]) {
        // DebugUtils.Log("=======RankPage3_Ctrl.list=======", list.length, this.scrollview, this.item);
        let parent = this.scrollview.content;
        for (let i = 0; i < list.length; i++) {
            let com = await UIMgr.Instance.ShowUIViewAsync(ResCfg.Prefabs.RankItem2, AbNames.Prefabs, parent);
            com.setData(list[i]);
        }
    }
}