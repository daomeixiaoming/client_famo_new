import EventMgr from "../../Framework/Managers/EventMgr";
import CocosUtils from "../../Framework/Utils/CocosUtils";
import DebugUtils from "../../Framework/Utils/DebugUtils";
import HttpUtils from "../../Framework/Utils/HttpUtils";
import { EventKey } from "../Config/EventCfg";
import { Lngs, NetCfg, NetStatus } from "../Config/GameConfig";
import {
  BossHistoryResponse,
  BoxConfigResponse,
  HttpResponse,
  OpenBoxRequest,
  OpenBoxResponse,
  PageResultBossHistoryItem,
  PlayerInfoResp,
  RequestShopBuy,
  RewardHistoryResponse,
  ShopRequest,
} from "../Config/MsgCfg";

const { ccclass, property } = cc._decorator;
/**
 * 所有的短链接处理
 */
@ccclass
export default class NetHttpMgr extends cc.Component {
  public static Instance: NetHttpMgr = null as unknown as NetHttpMgr;
  url: string; //url 地址
  onLoad(): void {
    if (NetHttpMgr.Instance === null) {
      NetHttpMgr.Instance = this;
    } else {
      this.destroy();
      return;
    }
  }

  public Init(): void {
    // DebugUtils.Log("========NetHttpMgr Init==========");
    this.url = NetCfg.url;
    this.url = `${NetCfg.url}demon-slaying-api/`;
  }

  /**
   * 进去大厅，请求大厅数据 ok
   */
  public EnterHomeReq() {
    let url = this.url;
    url += "demon-slaying/home";
    let param = null;
    DebugUtils.Log("================EnterHome111==============", url);
    HttpUtils.Get(url, param, (err, udata) => {
      let data: HttpResponse = JSON.parse(udata);
      let res = null;
      if (err) {
        console.error("=============EnterHome.error============", data);
      } else {
        let code = data.code;
        let message = data.message;
        let result = data.result;
        if (code && code === NetStatus.Normal && result) {
          res = result;
        } else {
          CocosUtils.showToast(message, 2);
        }
      }
      EventMgr.Instance.Emit(EventKey.Http_Res_EnterHome, res);
    });
  }

  /**
   * 攻击 ok
   * @param type 攻击类型
   */
  public PostAtkReq(body) {
    let url = this.url;
    url += "demon-slaying/attack";
    HttpUtils.PostJson(url, null, JSON.stringify(body), (err, udata) => {
      let data: HttpResponse = JSON.parse(udata);
      let res = null;
      if (err) {
        console.error("=============PostAtk.error============", data);
      } else {
        let code = data.code;
        let message = data.message;
        let result = data.result;
        DebugUtils.Log("=============PostAtk1============", result, code);
        if (code && code === NetStatus.Normal && result) {
          res = result;
        } else {
          CocosUtils.showToast(message, 2);
        }
      }
      EventMgr.Instance.Emit(EventKey.Http_Res_Atk, res);
    });
  }

  /**
   * 开启宝箱 ok
   * @param type
   * @returns 指定宝箱 type 和 num
   * Boss id num = 1
   * 全部 type num = Max
   */
  public PostOpenBoxRes(data: OpenBoxRequest) {
    let url = this.url;
    url += "demon-slaying/openBox";
    let body = data;
    HttpUtils.PostJson(url, null, JSON.stringify(body), (err, udata) => {
      let data: HttpResponse = JSON.parse(udata);
      let res = null;
      if (err) {
        console.error("=============PostOpenBox.error============", data);
      } else {
        let code = data.code;
        let message = data.message;
        let result: OpenBoxResponse = data.result;
        DebugUtils.Log("=============PostOpenBox============", result);
        if (code && code === NetStatus.Normal && result) {
          res = result;
        } else {
          CocosUtils.showToast(message, 2);
        }
      }
      EventMgr.Instance.Emit(EventKey.Http_Res_OpenBoxRes, res);
    });
  }

  /**
   * 获取排行 ok
   * @param type 1今日 2昨日
   * @returns
   */
  public GetRankList(type: number = 1) {
    let url = this.url;
    url += "demon-slaying/queryRank";
    let param = {
      type: type,
    };
    HttpUtils.Get(url, param, (err, udata) => {
      let data: HttpResponse = JSON.parse(udata);
      let res = null;
      if (err) {
        console.error("=============GetRankList.error============", data);
      } else {
        let code = data.code;
        let message = data.message;
        let result = data.result;
        if (code && code === NetStatus.Normal && result) {
          let list = result.rankList;
          res = list;
        } else {
          console.error("=============GetRankList============", message);
          CocosUtils.showToast(message, 2);
        }
        EventMgr.Instance.Emit(EventKey.Http_Res_RankPage1, res);
      }
    });
  }

  /**
   * 获取伤害榜的数据
   * @param pageStart 起始页 从1开始
   * @param pageEnd 结尾页
   * @returns
   */
  public GetRankHurtList(pageStart: number, pageEnd: number) {
    let url = this.url;
    url += "demon-slaying/queryBossHistory";
    let param = {
      pageNum: pageStart,
      pageSize: pageEnd,
    };
    HttpUtils.Get(url, param, (err, udata) => {
      let data: HttpResponse = JSON.parse(udata);
      let res = null;
      if (err) {
        console.error("=============GetRankHurtList.error============", data);
      } else {
        let code = data.code;
        let message = data.message;
        let result: BossHistoryResponse = data.result;
        // DebugUtils.Log("============GetRankHurtList=============", data);
        if (code && code === NetStatus.Normal && result) {
          let list: PageResultBossHistoryItem = result.page;
          res = list;
        } else {
          CocosUtils.showToast(message, 2);
        }
      }
      EventMgr.Instance.Emit(EventKey.Http_Res_RankPage3, res);
    });
  }

  //获取排行版榜-讨伐记录数据 1
  public GetRankRecordList(id: string) {
    let url = this.url;
    url += "demon-slaying/queryBossRank";
    let param = {
      id: id,
    };
    HttpUtils.Get(url, param, (err, udata) => {
      let data: HttpResponse = JSON.parse(udata);
      let res = null;
      if (err) {
        console.error("=============GetRankRecordList.error============", data);
      } else {
        let code = data.code;
        let message = data.message;
        let result = data.result;
        // console.error("=============GetRankRecordList============", data);
        if (code && code === NetStatus.Normal && result) {
          res = result;
        } else {
          // console.error("=============GetRankRecordList============", message);
          CocosUtils.showToast(message + code, 2);
        }
      }
      EventMgr.Instance.Emit(EventKey.Http_Res_GetRankDetial, res);
    });
  }

  /**
   * 获取奖励配置 ok
   * @param type
   * @returns
   */
  public GetHelpData() {
    let url = this.url;
    url += "demon-slaying/queryReward";
    let param = null;
    return new Promise((resolve, reject) => {
      HttpUtils.Get(url, param, (err, udata) => {
        let data: HttpResponse = JSON.parse(udata);
        if (err) {
          console.error("=============GetHelpData.error============", data);
          reject(null);
        } else {
          DebugUtils.Log("=============GetHelpData============", data);
          let code = data.code;
          let message = data.message;
          let result = data.result;
          if (code && code === NetStatus.Normal && result) {
            resolve(result);
          } else {
            console.error("=============GetHelpData11============", message);
            resolve(result);
          }
        }
      });
    });
  }

  /**
   * 获取商城数据 OK
   * @param page 起始索引
   * @param size  每页显示记录数
   * @param categoryIds 商品分类id列表，支持传多个为空时查所有， 1货币(金币购买货币) 2礼物 3兑换金币(货币兑换金币)
   * @param type 1伐魔商城 2破魔券商城
   * @returns
   */
  public GetShopList(
    page: number,
    size: number,
    categoryIds: string,
    type: number
  ) {
    let url = NetCfg.url;
    url += "logic-api/game/mall/product/list";
    let param: ShopRequest = {};
    param.pageNum = page;
    param.pageSize = size;
    param.categoryIds = categoryIds;
    param.gameId = NetCfg.gameType;
    // DebugUtils.Log("=================GetShopList1==================", type);
    HttpUtils.Get(url, param, (err, udata) => {
      let res = null;
      let data: HttpResponse = JSON.parse(udata);
      if (err) {
        console.error("=============GetShopList.error============", data);
      } else {
        let code = data.code;
        let message = data.message;
        let result = data.result;
        if (code && code === NetStatus.Normal && result) {
          res = result;
        } else {
          CocosUtils.showToast(message, 2);
        }
      }
      let msgKey = EventKey.Http_Res_GetShopList; //伐魔商城
      if (type === 2) {
        msgKey = EventKey.Http_Res_GetShopMoneyList; //获取破魔券商城列表
      }
      EventMgr.Instance.Emit(msgKey, res);
    });
  }

  /**
   * 购买破魔券 ok
   * @param categoryId 商品分类id
   * @param productId 商品id
   * @returns
   */
  public GetShopBuy(categoryId: number, productId: number) {
    let url = NetCfg.url;
    url += "logic-api/game/mall/account/buy";
    let param: RequestShopBuy = {};
    param.categoryId = categoryId;
    param.productId = productId;
    param.gameId = NetCfg.gameType;

    HttpUtils.Get(url, param, (err, udata) => {
      let data: HttpResponse = JSON.parse(udata);
      let res = null;
      if (err) {
        console.error("=============GetShopBuy.error============", data);
        // CocosUtils.showToast("购买商品失敗");
      } else {
        DebugUtils.Log("=============GetShopBuy============", data);
        let code = data.code;
        let message = data.message;
        res = data.result; //PlayerInfoResp
        if (code && code !== NetStatus.Normal) {
          CocosUtils.showToast(message + code, 2);
        }
      }
      EventMgr.Instance.Emit(EventKey.Http_Msg_ShopBuyRes, res);
    });
  }

  /**
   * 获取中奖记录
   * @param pageStart 起始页
   * @param pageEnd 每页数量
   * @returns
   */
  public GetRecordList(pageStart: number, pageEnd: number) {
    let url = this.url;
    url += "demon-slaying/queryRewardHistory";
    let param = {
      pageNum: pageStart,
      pageSize: pageEnd,
    };
    HttpUtils.Get(url, param, (err, udata) => {
      let data: HttpResponse = JSON.parse(udata);
      let res = null;
      if (err) {
        console.error("=============GetRecordList.error============", data);
      } else {
        // DebugUtils.Log("=============GetRecordList============", data);
        let code = data.code;
        let message = data.message;
        let result: RewardHistoryResponse = data.result;
        if (code && code === NetStatus.Normal && result) {
          let list = result.page;
          res = list;
        } else {
          CocosUtils.showToast(message + code, 2);
          console.error("=============GetRecordList111============", message);
        }
      }
      EventMgr.Instance.Emit(EventKey.Http_Res_GetRecordList, res);
    });
  }

  //获取宝箱配置
  public GeBoxCfg() {
    let url = this.url;
    url += "demon-slaying/queryBoxConfig";
    let param = null;
    HttpUtils.Get(url, param, (err, udata) => {
      let data: HttpResponse = JSON.parse(udata);
      let res = null;
      if (err) {
        console.error("=============GeBoxCfg.error============", data);
      } else {
        DebugUtils.Log("=============GeBoxCfg============", data);
        let code = data.code;
        let message = data.message;
        let result: BoxConfigResponse = data.result;
        if (code && code === NetStatus.Normal && result) {
          let list = result.boxes;
          res = list;
        } else {
          CocosUtils.showToast(message + code, 2);
          console.error("=============GeBoxCfg1111============", message);
        }
      }
      EventMgr.Instance.Emit(EventKey.Http_Res_GetBoxConfig, res);
    });
  }

  //-------------------------------------------------------------------------------------------------------------------------
  /**
   *获取玩家信息 ok
   */
  public GetPlayerInfo() {
    let url = NetCfg.url;
    url += "logic-api/logic/getPlayerInfoV2";
    let body = {
      gameType: NetCfg.gameType,
    };
    DebugUtils.Log("==========GetPlayerInfo==========", url);
    HttpUtils.PostJson(url, null, JSON.stringify(body), (err, udata) => {
      let data: HttpResponse = JSON.parse(udata);
      if (err) {
        CocosUtils.showToast(Lngs.GetPlayerInfoErr, 2);
        // console.error("=============GetPlayerInfo.error============", data);
        EventMgr.Instance.Emit(EventKey.Http_Res_GetPlayerInfo, null);
      } else {
        let code = data.code;
        let message = data.message;
        let result = data.result;
        if (code && code === NetStatus.Normal && result) {
          EventMgr.Instance.Emit(EventKey.Http_Res_GetPlayerInfo, result);
        } else {
          CocosUtils.showToast(Lngs.GetPlayerInfoErr, 2);
          // console.error("=============GetPlayerInfo============", message);
          EventMgr.Instance.Emit(EventKey.Http_Res_GetPlayerInfo, null);
        }
      }
    });
  }

  /**
   * 获取游戏基础配置 ok
   */
  public GetGames(callback?: Function) {
    let url = NetCfg.url;
    url += "logic-api/logic/getGames";
    let body = {
      gameType: NetCfg.gameType,
    };
    DebugUtils.Log("=============GetGames1============", url);
    return new Promise((resolve, reject) => {
      HttpUtils.PostJson(url, null, JSON.stringify(body), (err, udata) => {
        let data: HttpResponse = JSON.parse(udata);
        if (err) {
          console.error("=============GetGames.error============", data);
          reject(null);
        } else {
          let code = data.code;
          let message = data.message;
          let result = data.result;
          DebugUtils.Log("=============GetGames============", data);
          if (code && code === NetStatus.Normal && result) {
            resolve(result);
          } else {
            console.error("=============GetGames============", message);
            resolve(result);
          }
        }
      });
    });
  }
}
