import EventMgr from "../../Framework/Managers/EventMgr";
import { NetMgr, NetMsg, State } from "../../Framework/Managers/Net/NetMgr";
import DebugUtils from "../../Framework/Utils/DebugUtils";
import { protoGame } from "../../Proto/game";
import { EventKey } from "../Config/EventCfg";
import GameLogic from "../GameLogic";

const { ccclass, property } = cc._decorator;
/**
 * 所有的ws 长链接处理写在这里
 */
@ccclass
export default class NetWsMgr extends cc.Component {
    public static Instance: NetWsMgr = null as unknown as NetWsMgr
    onLoad(): void {
        if (NetWsMgr.Instance === null) {
            NetWsMgr.Instance = this;
        } else {
            this.destroy();
            return;
        }
    }

    public Init(): void {
        // DebugUtils.Log("========NativeMgr Init==========");
        EventMgr.Instance.AddEventListener(NetMsg.NetMessage, this, this.onWsEventMsg);
    }

    public onDestroy(): void {
        EventMgr.Instance.RemoveListenner(NetMsg.NetMessage, this, this.onWsEventMsg);
    }

    /**
     * 发送数据
     * @param stype 
     * @param ctype 
     * @param msgBuf 
     * @returns 
     */
    private _sendMsg(stype: number, ctype: number, msgBuf: any): void {
        DebugUtils.Log("========NetWsMgr _sendMsg==========", msgBuf);
        if (msgBuf === null) {
            return;
        }
        NetMgr.Instance.send_data(msgBuf);
    }

    //发送心跳
    private setPingReq() {
        let res = protoGame.Request.create({
            cmd: protoGame.RequestCode.PING
        });
        let buf = protoGame.Request.encode(res).finish();
        DebugUtils.Log("========发送心跳==========");
        NetMgr.Instance.send_data(buf);
    }

    /**
     * 收到数据
     * @param uname 
     * @param udata 
     */
    private onWsEventMsg(uname: string, udata: ArrayBuffer): void {
        // DebugUtils.Log("===========onWsEventMsg=========", udata);
        const uint8Array = new Uint8Array(udata);
        let buf = protoGame.Response.decode(uint8Array);
        if (buf) {
            let ctype = buf.cmd;
            let body = buf.body;
            // DebugUtils.Log("========NetWsMgr onWsEventMsg==========", ctype);
            switch (ctype) {
                // case protoGame.ResponseCode.PONG: //收到心跳
                //     this.onPoneRes(body);
                //     break;
                case protoGame.ResponseCode.DEMON_SLAYING_BOSS_STATUS: //Boss状态
                    this.onBossInfoChange(body);
                    break;
                case protoGame.ResponseCode.DEMON_SLAYING_REWARD_INFO: //跑马灯数据
                    this.onRewardInfoChange(body);
                    break;
                case protoGame.ResponseCode.DEMON_SLAYING_BOX_REWARD: //Boss死亡弹出包厢信息
                    this.onBoxReward(body);
                    break;
            }
        }
    }

    // Boss 状态更新
    private onBossInfoChange(data: protoGame.IResponseBody) {
        DebugUtils.Log("==============onBossInfoChange============", data);
        // 实时更新Boss数据
        EventMgr.Instance.Emit(EventKey.WS_UpdateBoss, data);
    }

    //跑马灯数据
    private onRewardInfoChange(data: protoGame.IRewardInfo | any) {
        DebugUtils.Log("=============onRewardInfoChange=============", data);

        let temp = data.demonSlayingRewardInfo;
        // 保存跑马灯数据
        GameLogic.Instance.setPopMsgList(temp);
    }

    // 开启宝箱
    private onBoxReward(data: protoGame.IBoxInfo | any) {
        DebugUtils.Log("=============onBoxReward=============", data);

        let temp: protoGame.IBoxInfo = data.demonSlayingBoxReward;
        let num = GameLogic.Instance.GetBoxByType(temp.boxType) || 0;
        GameLogic.Instance.UpdateBoxNum(temp.boxType, (1 + num));
        EventMgr.Instance.Emit(EventKey.WS_RewardBox, temp);

        //更新数据
        GameLogic.Instance.getPlayerInfo();
    }
}
