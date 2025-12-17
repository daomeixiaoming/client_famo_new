import GridListView from "../../../../Framework/Engine/GridListView";
import EventMgr from "../../../../Framework/Managers/EventMgr";
import { ResMgr } from "../../../../Framework/Managers/ResMgr";
import { ResMgrAsync } from "../../../../Framework/Managers/ResMgrAsync";
import UIBase from "../../../../Framework/Managers/UIBase";
import DebugUtils from "../../../../Framework/Utils/DebugUtils";
import { EventKey } from "../../../Config/EventCfg";
import { AbNames, Lngs, UICfg } from "../../../Config/GameConfig";
import { BossRankResponse } from "../../../Config/MsgCfg";
import { ResCfg } from "../../../Config/ResConfig";
import NetHttpMgr from "../../../Data/NetHttpMgr";
import RankItem1_Ctrl from "./RankItem1_Ctrl";

const { ccclass, property } = cc._decorator;
/**
 * 伤害榜-讨伐记录
 */
@ccclass
export default class RankDetial_Ctrl extends UIBase {
    list: GridListView;
    infoList: any = [];
    nanNode: cc.Node;
    lab_timestart: cc.Label;
    lab_timeend: cc.Label;
    layout: cc.Node;
    onLoad() {
        super.onLoad();
        this.initUI();
        EventMgr.Instance.AddEventListener(EventKey.Http_Res_GetRankDetial, this, this.onGetRankDetialRes);
    }

    start() {

    }

    protected onDestroy(): void {
        EventMgr.Instance.RemoveListenner(EventKey.Http_Res_GetRankDetial, this, this.onGetRankDetialRes);
    }

    public InitScene(data: string): void {
        NetHttpMgr.Instance.GetRankRecordList(data);
    }

    private async initUI() {
        this.AddButtonListener("node/bg/sp_title/btn_close", this, this.onCloseBtn);

        let scrollView = this.view["node/bg/detial/scrollView"];
        let pre = await ResMgrAsync.Instance.IE_GetAsset(AbNames.Prefabs, ResCfg.Prefabs.RankItem1, cc.Prefab) as cc.Prefab;
        this.list = scrollView.addComponent(GridListView) as GridListView;
        this.list.spaceY = 15;
        this.list.Prefab = pre;
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = "RankDetial_Ctrl";// 这个是代码文件名
        clickEventHandler.handler = "updateItem";
        clickEventHandler.customEventData = "foobar";
        this.list.delegate = clickEventHandler;

        //无数据节点
        let temp = this.view["node/bg/bg2/icon"] as cc.Node;
        temp.destroyAllChildren();
        let preNan = await ResMgrAsync.Instance.IE_GetAsset(AbNames.Prefabs, ResCfg.Prefabs.NanItem, cc.Prefab) as cc.Prefab;
        this.nanNode = cc.instantiate(preNan) as cc.Node;
        temp.addChild(this.nanNode);
        this.nanNode.active = false;

        this.layout = this.view["node/bg/detial/layout"] as cc.Node;

        this.lab_timestart = this.ViewComponent("node/bg/detial/layout/lab_time_start", cc.Label) as cc.Label;
        this.lab_timeend = this.ViewComponent("node/bg/detial/layout/lab_time_end", cc.Label) as cc.Label;
    }

    private updateItem(listView: GridListView, pos: number, item: cc.Node) {
        // cc.log(' ShopMoney_Ctrl updateItem_V pos ', pos)
        let data = this.infoList[pos];
        let comp = item.getComponent(RankItem1_Ctrl) || item.addComponent(RankItem1_Ctrl);
        if (comp) {
            comp.setData(data, pos);
        }
    }

    // 显示伤害榜详情
    public setData(data: BossRankResponse): void {
        let list = data.rankList

        // list.length = 0;
        this.infoList = list;
        this.nanNode.active = (this.infoList.length > 0) ? false : true;
        this.scheduleOnce(() => {
            this.list.reset(this.infoList.length);
        })

        let timeStart = data.startTime.slice(0, -3);
        timeStart = timeStart.replace(/-/g, '.');
        let timeEnd = data.endTime.slice(0, -3);
        timeEnd = timeEnd.replace(/-/g, '.');
        this.lab_timestart.string = `${Lngs.RankTimeStart}:${timeStart}`;
        this.lab_timeend.string = `${Lngs.RankTimeEnd}:${timeEnd}`;
    }

    private onGetRankDetialRes(uname: string, udata: BossRankResponse): void {
        DebugUtils.Log("==========RankDetial_Ctrl.onGetRankDetialRes===============", udata);
        if (udata) {
            this.setData(udata);
        }
    }
}
