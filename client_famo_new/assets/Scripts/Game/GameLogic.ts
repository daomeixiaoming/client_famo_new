import EventMgr from "../Framework/Managers/EventMgr";
import { ResMgr } from "../Framework/Managers/ResMgr";
import { ResMgrAsync } from "../Framework/Managers/ResMgrAsync";
import SoundMgr from "../Framework/Managers/SoundMgr";
import CocosUtils from "../Framework/Utils/CocosUtils";
import DebugUtils from "../Framework/Utils/DebugUtils";
import GameUtils from "../Framework/Utils/GameUtils";
import { protoGame } from "../Proto/game";
import { EventKey } from "./Config/EventCfg";
import {
    AbNames,
    HelpDataItem,
    Lngs,
    NetCfg,
    UICfg,
} from "./Config/GameConfig";
import {
    AttackInfo,
    AttackResponse,
    BoxType,
    GameConfigResp,
    HomeResponse,
    IAPPInfo,
    OpenBoxRequest,
    OpenBoxResponse,
    PlayerInfoResp,
    RewardResponse,
} from "./Config/MsgCfg";
import { ResCfg } from "./Config/ResConfig";
import NetHttpMgr from "./Data/NetHttpMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameLogic extends cc.Component {
    public static Instance: GameLogic = null as unknown as GameLogic;

    roomId: number = 0; //主播房间号
    anchorId: number = 0; //主播id
    userId: number = 0; //用户自己的uid

    recordList: number[] = []; //历史记录数据
    private posMsgList: protoGame.IRewardInfo[] = []; //跑马灯数据，只保留3条

    appInfo: IAPPInfo = null;

    //游戏帮助数据
    gameCfg: GameConfigResp = null; //游戏配置
    gameRates: RewardResponse = null; //中将概率

    // --------实际数据------------
    private _maxHp: number = 0; //记录最大血量
    shopBuyType: number;
    get maxHp(): number {
        return this._maxHp;
    }
    private _curHp: number = 0; //记录当前血量
    get curHp(): number {
        return this._curHp;
    }
    set curHp(value: number) {
        this._curHp = value;
    }

    //当前破魔券】
    private exorcismVoucher: number = 0;
    // 当前优币
    private currency: number = 0;

    private enterHomeData: HomeResponse = null;

    // 宝箱数据
    boxMap = new Map();

    loginIdx: number = 0; //记录登录状态

    onLoad(): void {
        if (GameLogic.Instance === null) {
            GameLogic.Instance = this;
        } else {
            this.destroy();
            return;
        }
    }

    public Init(): void {
        this.recordList.length = 0;
        this.exorcismVoucher = 0;
        this.enterHomeData = {};

        this.registerEvent();
    }

    protected onDestroy(): void {
        DebugUtils.Log("=======GameLogic.onDestroy===========");
        this.unRegisterEvent();
    }

    // 注册事件
    private registerEvent(): void {
        EventMgr.Instance.AddEventListener(
            EventKey.Http_Res_GetPlayerInfo,
            this,
            this.onGetPlayerInfoRes
        );
        EventMgr.Instance.AddEventListener(
            EventKey.Http_Msg_ShopBuyRes,
            this,
            this.onShopBuyRes
        );
        EventMgr.Instance.AddEventListener(
            EventKey.Http_Res_EnterHome,
            this,
            this.onEnterHomeRes
        );
        EventMgr.Instance.AddEventListener(
            EventKey.Http_Res_Atk,
            this,
            this.onAtkRes
        );
        EventMgr.Instance.AddEventListener(
            EventKey.Http_Res_OpenBoxRes,
            this,
            this.onOpenBoxRes
        );
    }

    private unRegisterEvent(): void {
        EventMgr.Instance.RemoveListenner(
            EventKey.Http_Res_GetPlayerInfo,
            this,
            this.onGetPlayerInfoRes
        );
        EventMgr.Instance.RemoveListenner(
            EventKey.Http_Msg_ShopBuyRes,
            this,
            this.onShopBuyRes
        );
        EventMgr.Instance.RemoveListenner(
            EventKey.Http_Res_EnterHome,
            this,
            this.onEnterHomeRes
        );
        EventMgr.Instance.RemoveListenner(
            EventKey.Http_Res_Atk,
            this,
            this.onAtkRes
        );
        EventMgr.Instance.RemoveListenner(
            EventKey.Http_Res_OpenBoxRes,
            this,
            this.onOpenBoxRes
        );
    }

    // 更行指定类型宝箱的数量
    public UpdateBoxNum(type: BoxType, num: number) {
        this.boxMap.set(type, num);
    }

    // 获取指定类型的宝箱数据
    public GetBoxByType(type: BoxType): number | undefined {
        return this.boxMap.get(type);
    }

    //------------------------------------------------------------------数据处理---------------------------------------------------------------
    public getHomeData() {
        return this.enterHomeData;
    }

    /**
     * 组合帮助数据
     * @param data css 数据
     * @param reward 具体奖励
     */
    public comboHelpData(data: HelpDataItem[], reward: RewardResponse) {
        data[1].des = data[1].des + reward.maxBlood.toString();
    }

    public getDesByType(type: BoxType) {
        let des = "";
        switch (type) {
            case BoxType.Box_BY:
                des = Lngs.Box_BY;
                break;
            case BoxType.Box_HJ:
                des = Lngs.Box_HJ;
                break;
            case BoxType.Box_ZS:
                des = Lngs.Box_ZS;
                break;
            default:
                break;
        }
        return des;
    }

    /**
     * 根据类型判断
     * @param type
     * @returns
     */
    public getCostByType(type: number): number {
        let res = 0;
        let attackList = this.enterHomeData.attackList;
        for (let i = 0; i < attackList.length; i++) {
            let temp: AttackInfo = attackList[i];
            if (temp.type === type) {
                res = temp.price;
                break;
            }
        }
        return res;
    }
    /**
     * 设置跑马灯数据
     * 只保留最新的三条数据
     * @param data
     */
    public setPopMsgList(data: protoGame.IRewardInfo) {
        this.posMsgList.push(data);
        if (this.posMsgList.length > 3) {
            this.posMsgList.splice(0, this.posMsgList.length - 3);
        }
        // DebugUtils.Log("=========setPopMsgList==========", this.posMsgList);
    }

    public getPopMsgList() {
        return this.posMsgList;
    }

    // 获取破魔券数据
    public getExorcismVoucher() {
        return this.exorcismVoucher;
    }

    // 获取金币数据
    public getCurrency() {
        return this.currency;
    }

    // 更新金币和破魔石
    private updateGameInfo(): void {
        DebugUtils.Log("==============updateGameInfo===================");
        // 更新破魔券
        EventMgr.Instance.Emit(EventKey.Update_ExorcismVoucher, "");
        // 更新金币
        EventMgr.Instance.Emit(EventKey.Update_Currency, "");
    }
    //-------------------------------------------------------------------资源加载---------------------------------------------------------------
    //加载Notice资源包结束
    private LoadNoticeOver() {
        // // 加载完毕创建Notice界面
        DebugUtils.Log(
            "step2: GameLogic.LoadNoticeOver 加载Notice模块结束=========="
        );
        //加载通用模块
        this.loadComPkg();
    }

    // 加载Notice模块的资源
    public loadNoticePkg() {
        // let res = ResMgr.Instance.getAsset(AbNames.Prefab_Notice, UICfg.Loading, cc.Prefab);
        // if (res) {
        //     DebugUtils.Log("============加载Notice模块 end1=============", this.loginIdx);
        //     this.LoadNoticeOver();
        //     return;
        // }
        // ResMgr.Instance.preloadResPkg(ResPkg_Notice, (now: any, total: any) => {
        // }, () => {
        //     DebugUtils.Log("============加载Notice模块 end=============", this.loginIdx);
        //     this.LoadNoticeOver();
        // });
        DebugUtils.Log(
            "============加载Notice模块 end1=============",
            this.loginIdx
        );
        this.LoadNoticeOver();
    }

    // 通用模块加载完毕
    private loadComPkgOver() {
        DebugUtils.Log(
            "step3: GameLogic.loadComPkgOver 加载Common模块结束=========="
        );
        // 加载完毕创建Notice界面
        EventMgr.Instance.Emit(EventKey.UI_LoadNoticeOver, "");
        // 播放背景音乐
        this.playBgMusic();
    }

    //加载通用模块的资源
    public loadComPkg() {
        DebugUtils.Log("============加载通用模块 loadComPkg=============");
        this.loadComPkgOver();
    }

    // 播放背景音乐
    public async playBgMusic() {
        let value = localStorage.getItem("GAME_MUSIC_MUTE");
        let v = parseInt(value);
        if (value === null || value === undefined || v === 0) {
            //播放
            // let audioClip = (await ResMgrAsync.Instance.IE_GetAsset(
            //     AbNames.Sounds,
            //     ResCfg.VoiceCfg.bg_music,
            //     cc.AudioClip
            // )) as cc.AudioClip;
            // if (audioClip) {
            //     SoundMgr.Instance.playBgMusic(audioClip, true);
            //     SoundMgr.Instance.setMusicMute(false);
            // }
            // 起始状态
            if (v === null || v === undefined) {
                SoundMgr.Instance.setMusicMute(false);
            }
        } else {
            SoundMgr.Instance.setMusicMute(true);
        }

    }

    /**
     * 停止背景音乐
     */
    public stopBgMusic() {
        SoundMgr.Instance.stopBgMusic();
    }

    // 重置相关数据
    public resetGameInfo() {
        this.enterHome(); //场景数据
        this.getPlayerInfo(); //用户数据
    }
    //-------------------------------------------------------------------Https 请求 start---------------------------------------------------------------

    //获取用户信息 ok
    public getPlayerInfo() {
        // 获取用户信息之前先加载 Notice 资源包
        NetHttpMgr.Instance.GetPlayerInfo();
    }

    // 获取用户信息返回
    private onGetPlayerInfoRes(uname: string, udata: PlayerInfoResp): void {
        // DebugUtils.Log("=========GameLogic.getPlayerInfo==========", udata);
        if (udata) {
            if ("currency" in udata) {
                this.currency = udata.currency; //金币数据
            }
            if ("gameCurrency" in udata) {
                this.exorcismVoucher = udata.gameCurrency; //破魔券数据
            }
            this.userId = udata.userId;
            // res.pop = 1; //1 不显示测试
            this.updateGameInfo();

            // DebugUtils.Log("step6: GameLogic.onGetPlayerInfoRes 开始游戏==========");
            //更新登录页面的状态，表示可以开始游戏了
            EventMgr.Instance.Emit(EventKey.UI_ShowLogin, "");
        }
    }

    // 获取规则配置
    public async getGames() {
        if (!this.gameCfg) {
            this.gameCfg = (await NetHttpMgr.Instance.GetGames()) as GameConfigResp;
        }
    }

    // 获取规则配置
    public async getGameRates() {
        if (!this.gameRates) {
            this.gameRates = await NetHttpMgr.Instance.GetHelpData();
        }
    }

    // 请求进入游戏 ok
    public enterHome() {
        DebugUtils.Log("=========GameLogic.enterHome==========");
        NetHttpMgr.Instance.EnterHomeReq();
    }
    // 请求进入游戏返回
    private onEnterHomeRes(uanme: string, udata: HomeResponse): void {
        DebugUtils.Log("=========GameLogic.onEnterHomeRes==========");
        if (udata) {
            // 记录大厅的数据
            this.enterHomeData = GameUtils.DeepClone(udata);

            // 记录当前血量
            this._curHp = udata.blood || 0;
            this._maxHp = udata.maxBlood || 0;

            // 记录宝箱信息
            this.boxMap.clear();
            let boxList = udata.boxList || [];
            for (let i = 0; i < boxList.length; i++) {
                let item = boxList[i];
                let type = item.type;
                let num = item.num;
                if (!this.boxMap.get(type)) {
                    this.boxMap.set(type, num);
                }
            }

            // 重置登录标记位
            this.loginIdx = 0;
        }
    }

    // 开始攻击 ok
    public startAtk(atkType: number) {
        let body = {
            attackType: atkType,
            roomId: this.roomId || NetCfg.roomId,
            anchorId: this.anchorId || NetCfg.anchorId,
        };
        NetHttpMgr.Instance.PostAtkReq(body);
    }

    // 攻击返回
    private onAtkRes(uname: string, udata: AttackResponse): void {
        if (udata) {
            // 更新当前血量
            if ("blood" in udata) {
                this.curHp = udata.blood;
            }
            // 更新破魔石
            if ("exorcismVoucher" in udata) {
                this.exorcismVoucher = udata.exorcismVoucher;
            }
            this.updateGameInfo();
        }
    }

    /**
     * 开宝箱
     * @param type 宝箱类型
     * @param num 宝箱数据量
     * @param id 宝箱id
     * Boss死亡时候， 传 id 和 num = 1
     * 指定宝箱 type 和 num
     * 全部 type 和 num = Max
     */
    public openBox(data: OpenBoxRequest) {
        NetHttpMgr.Instance.PostOpenBoxRes(data);
    }

    // 开宝箱返回
    private onOpenBoxRes(uname: string, udata: OpenBoxResponse): void {
        if (udata) {
            // 更新宝箱的数据
            this.UpdateBoxNum(udata.type, udata.num);
        }
    }

    /**
     * 购买商品
     * @param categoryId
     * @param productId
     * @param type 1 是破魔券商城 2 是伐魔商城
     */
    public async shopBuy(categoryId: number, productId: number, type: number) {
        this.shopBuyType = type;
        NetHttpMgr.Instance.GetShopBuy(categoryId, productId);
    }

    // 购买商品返回
    private onShopBuyRes(unam: string, udata: PlayerInfoResp): void {
        DebugUtils.Log("=======GameLogic.onShopBuyRes========", udata);
        // CocosUtils.showToast("购买商品返回" + udata);
        if (udata) {
            //更新数据
            if ("gameCurrency" in udata) {
                this.exorcismVoucher = udata.gameCurrency; //更新破魔券
            }
            if ("currency" in udata) {
                this.currency = udata.currency; //更新金币
            }
            this.updateGameInfo();

            let categoryId = udata.categoryId; //1货币(金币购买货币) 2礼物 3兑换金币(货币兑换金币)
            let des = Lngs.ShopTip1 + this.exorcismVoucher;
            if (this.shopBuyType === 2) {
                //伐魔兑换
                des = Lngs.ShopTip2;
                if (categoryId === 3) {
                    des = Lngs.ShopTip5;
                }
            }
            CocosUtils.showToast(des);
        }
    }

    //-------------------------------------------------------------------Https 请求 end---------------------------------------------------------------
}
