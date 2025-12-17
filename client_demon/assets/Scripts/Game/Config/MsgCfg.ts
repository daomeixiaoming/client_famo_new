//---------------------------------------------数据结构---------------------------------------------------------
export interface IAPPInfo {
  appVersion: string;
  deviceId: string;
  deviceName: string;
  deviceType: number;
  systemVersion: string;
  statusBarHeight: number; // 34
  navigationBarHeight: number;
  safeAreaInsetBottom: number; // 44
}

// 破魔券单个item 数据
export interface ShopMoneyData {
  idx: number; //宝箱索引
  price: number; //宝箱价格
  name: string; //宝箱名字
  num: number; //数量
}

// 伏魔券单个数据
export interface ShopData {
  icon: string; //宝箱索引
  price: number; //宝箱价格
  name: string; //宝箱名字
  num: number; //数量
}

//---------------------------------------------WS 消息---------------------------------------------------------

//---------------------------------------------http 消息---------------------------------------------------------
// 兔打扰策略：0不弹 1每次 2每日 3每周 4每月
export enum PopType {
  Pop_Nan = 0, //不弹
  Pop_Always, // 每次打开弹
  Pop_Day, //每天一次
  Pop_Week, // 每周一次
  Pop_Month, // 每月一次
}

/**
 * 用户配置信息返回
 * GameConfigResp
 */
export interface GameConfigResp {
  /**
   * 游戏ID
   */
  gameId?: number;
  /**
   * 游戏规制
   */
  regulation?: string;
  [property: string]: any;
}

/**
 * 用户数据返回
 * PlayerInfoResp
 */
export interface PlayerInfoResp {
  /**
   * 剩余金币
   */
  currency?: number;
  /**
   * 剩余魔法石
   */
  energy?: number;
  /**
   * 游戏货币，不同游戏可能有不同的货币值 目前是破魔券
   */
  gameCurrency?: number;
  /**
   * 幸运值
   */
  LuckValue?: number;
  /**
   * 兔打扰策略：0不弹 1每次 2每日 3每周 4每月
   */
  pop?: number;
  /**
   * 用户id
   */
  userId?: number;
  [property: string]: any;
}

/**
 *  帮助的概率数据
 * RewardRateResponse
 */
export interface RewardRateResponse {
  /**
   * 礼物价格
   */
  giftPrice?: number;
  /**
   * 中奖概率
   */
  rate?: string;
  /**
   * 积分奖励
   */
  reward?: string;
  /**
   * 标题
   */
  title?: string;
  [property: string]: any;
}

//----------------------------------- 数据类型---------------------------------------------
// 宝箱类型 1为钻石宝箱，2为黄金宝箱，3为白银宝箱
export enum BoxType {
  Box_Nan = 0, //未中宝箱
  Box_ZS, //钻石
  Box_HJ, //黄金
  Box_BY, //白银
}
// 攻击类型
export enum AtkType {
  Atk_500 = 1, //500
  Atk_2500, //2500
  Atk_5000, //5000
}

//--------------------------------------------------------------------实际协议 http--------------------------------------------------------------------
/**
 * ResultResponseHomeResponse
 */
export interface HttpResponse {
  code?: number;
  message?: string;
  result?: HomeResponse;
  [property: string]: any;
}
//-------------------------------------主页状态---------------------------------------------
/**
 * HomeResponse
 */
export interface HomeResponse {
  /**
   * 宝箱信息
   */
  attackList?: AttackInfo[];
  /**
   * 当前血量
   */
  blood?: number;
  /**
   * 宝箱信息
   */
  boxList?: BoxInfo[];
  /**
   * 最大血量
   */
  maxBlood?: number;
  /**
   * 复活时间戳
   */
  respawnAt?: number;
  /**
   * 剩余复活时间
   */
  respawnTimer?: number;
  [property: string]: any;
}

/**
 * com.org.platform.demon.domain.resp.HomeResponse.AttackInfo
 *
 * AttackInfo
 */
export interface AttackInfo {
  /**
   * 攻击消耗破魔卷
   */
  price?: number;
  /**
   * 攻击类型，1为500，2为2500，3为5000
   */
  type?: number;
  [property: string]: any;
}

/**
 * com.org.platform.demon.domain.resp.HomeResponse.BoxInfo
 *
 * BoxInfo
 */
export interface BoxInfo {
  /**
   * 宝箱数量
   */
  num?: number;
  /**
   * 宝箱类型，1为钻石宝箱，2为黄金宝箱，3为白银宝箱
   */
  type?: number;
  [property: string]: any;
}

//-------------------------------------查询商城---------------------------------------------
/**
 * MallResponse
 */
export interface MallResponse {
  /**
   * 商城内容
   */
  list?: MallItem[];
  [property: string]: any;
}

/**
 * com.org.platform.demon.domain.resp.MallResponse.MallItem
 *
 * MallItem
 */
export interface MallItem {
  /**
   * 主键id
   */
  id?: number;
  /**
   * 商品图片
   */
  image?: string;
  /**
   * 商品名
   */
  name?: string;
  /**
   * 商品价格
   */
  price?: number;
  [property: string]: any;
}

//-------------------------------------查询排行榜---------------------------------------------
/**
 * RankResponse
 */
export interface RankResponse {
  /**
   * 排行列表
   */
  rankList?: RankItem[];
  [property: string]: any;
}

/**
 * com.org.platform.demon.domain.resp.RankItem
 *
 * RankItem
 */
export interface RankItem {
  /**
   * 用户头像
   */
  avatar?: string;
  /**
   * 用户昵称
   */
  nickname?: string;
  /**
   * 排名
   */
  ranking?: number;
  /**
   * 用户Id
   */
  userId?: number;
  /**
   * 用户等级图标list
   */
  userLabelList?: UserLabelResponse[];
  /**
   * 用户靓号
   */
  userNum?: number;
  /**
   * 伤害值
   */
  value?: number;
  [property: string]: any;
}

/**
 * UserLabelResponse
 */
export interface UserLabelResponse {
  /**
   * 高
   */
  high?: number;
  /**
   * 标签图片
   */
  labelImg?: string;
  /**
   * 标签名字
   */
  labelName?: string;
  /**
   * 等级
   */
  level?: number;
  /**
   * 类型：1-用户等级，2-主播等级，3-vip等级，4-粉丝团，5-贵族，6-超级粉丝团
   * 类型
   */
  type?: number;
  /**
   * 宽
   */
  wide?: number;
  [property: string]: any;
}

//-------------------------------------查询boss记录---------------------------------------------
/**
 * BossHistoryResponse
 */
export interface BossHistoryResponse {
  /**
   * boss 记录 list
   */
  page?: PageResultBossHistoryItem;
  [property: string]: any;
}

/**
 * boss 记录 list
 *
 * PageResultBossHistoryItem
 */
export interface PageResultBossHistoryItem {
  /**
   * 是否为空
   */
  emptyFlag?: boolean;
  /**
   * 结果集
   */
  list?: BossHistoryItem[];
  /**
   * 其他属性对象
   */
  otherAttribute?: JSONObject;
  /**
   * 当前页
   */
  pageNum?: number;
  /**
   * 总页数
   */
  pages?: number;
  /**
   * 每页的数量
   */
  pageSize?: number;
  /**
   * 总记录数
   */
  total?: number;
  [property: string]: any;
}

/**
 * com.org.platform.demon.domain.resp.BossHistoryResponse.BossHistoryItem
 *
 * BossHistoryItem
 */
export interface BossHistoryItem {
  /**
   * 主键id
   */
  id?: number;
  /**
   * 结束时间
   */
  time?: string;
  /**
   * 宝箱类型，1为钻石宝箱，2为黄金宝箱，3为白银宝箱
   */
  type?: number;
  [property: string]: any;
}

/**
 * 其他属性对象
 *
 * JSONObject
 */
export interface JSONObject {
  key?: { [key: string]: any };
  [property: string]: any;
}
//-------------------------------------查询boss排行---------------------------------------------
/**
 * BossRankResponse
 */
export interface BossRankResponse {
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 排行列表
   */
  rankList?: RankItem[];
  /**
   * 开始时间
   */
  startTime?: string;
  [property: string]: any;
}
//-------------------------------------查询奖励配置---------------------------------------------
/**
 * RewardResponse
 */
export interface RewardResponse {
  /**
   * boss血量
   */
  maxBlood?: number;
  /**
   * 排名奖励
   */
  rankRewardConfigs?: RankRewardConfig[];
  /**
   * 复活时间
   */
  respawnTimer?: number;
  [property: string]: any;
}

/**
 * com.org.platform.demon.domain.resp.RewardResponse.RankRewardConfig
 *
 * RankRewardConfig
 */
export interface RankRewardConfig {
  /**
   * 排名范围结束
   */
  maxRank?: number;
  /**
   * 排名范围起始
   */
  minRank?: number;
  /**
   * 宝箱类型，1为钻石宝箱，2为黄金宝箱，3为白银宝箱
   */
  type?: number;
  [property: string]: any;
}
//-------------------------------------攻击---------------------------------------------
/**
 * AttackRequest
 */
export interface Request {
  /**
   * 攻击类型，1为500，2为2500，3为5000
   */
  attackType: number;
  [property: string]: any;
}
/**
 * AttackResponse
 */
export interface AttackResponse {
  /**
   * 攻击类型，1为500，2为2500，3为5000
   */
  attackType?: number;
  /**
   * 当前血量
   */
  blood?: number;
  /**
   * 最新破魔卷
   */
  exorcismVoucher?: number;
  /**
   * 伤害
   */
  hurt?: number;
  /**
   * 奖励
   */
  reward?: number;
  [property: string]: any;
}
//-------------------------------------开宝箱---------------------------------------------
/**
 * OpenBoxRequest 请求开启宝箱参数
 */
export interface OpenBoxRequest {
  /**
   * 开启宝箱的id，如果不指定，则根据指定的num开启最新的num个宝箱
   */
  id?: number;
  /**
   * 开启宝箱数量，如果有id，则不需要数量
   */
  num?: number;
  /**
   * 开启宝箱类型，1为钻石宝箱，2为黄金宝箱，3为白银宝箱。如果有id，则不需要
   */
  type?: number;
  [property: string]: any;
}

/**
 * OpenBoxResponse
 */
export interface OpenBoxResponse {
  /**
   * 礼物列表
   */
  giftList?: GiftItem[];
  /**
   * 剩余数量
   */
  num?: number;
  /**
   * 开启宝箱类型，1为钻石宝箱，2为黄金宝箱，3为白银宝箱。
   */
  type?: number;
  [property: string]: any;
}

/**
 * com.org.platform.demon.domain.resp.OpenBoxResponse.GiftItem
 *
 * GiftItem
 */
export interface GiftItem {
  giftId?: number;
  giftName?: string;
  giftPrice?: number;
  image?: string;
  num?: number;
  [property: string]: any;
}

//-------------------------------------中奖记录---------------------------------------------
/**
 * RewardHistoryResponse
 */
export interface RewardHistoryResponse {
  page?: PageResultRewardHistoryItem;
  [property: string]: any;
}

/**
 * PageResultRewardHistoryItem
 */
export interface PageResultRewardHistoryItem {
  /**
   * 是否为空
   */
  emptyFlag?: boolean;
  /**
   * 结果集
   */
  list?: RewardHistoryItem[];
  /**
   * 其他属性对象
   */
  otherAttribute?: JSONObject;
  /**
   * 当前页
   */
  pageNum?: number;
  /**
   * 总页数
   */
  pages?: number;
  /**
   * 每页的数量
   */
  pageSize?: number;
  /**
   * 总记录数
   */
  total?: number;
  [property: string]: any;
}

/**
 * com.org.platform.demon.domain.resp.RewardHistoryResponse.RewardHistoryItem
 *
 * RewardHistoryItem
 */
export interface RewardHistoryItem {
  hurt?: number;
  reward?: number;
  time?: string;
  [property: string]: any;
}

//---------------------------------------------商城---------------------------------------------------
export interface ShopRequest {
  /**
   * 商品分类id列表，支持传多个为空时查所有， 1货币(金币购买货币) 2礼物 3兑换金币(货币兑换金币)
   */
  categoryIds?: string;
  /**
   * 游戏id
   */
  gameId?: number;
  /**
   * 页码
   * 显示数
   */
  offset?: number;
  /**
   * 当前记录起始索引
   * 当前页
   */
  pageNum?: number;
  /**
   * 每页显示记录数
   * 显示数
   */
  pageSize?: number;
  [property: string]: any;
}

/**
 * PageResponseGameMallProductResp
 */
export interface PageResponseGameMallProductResp {
  /**
   * 列表
   */
  list?: GameMallProductResp[];
  /**
   * 其他属性对象
   */
  otherAttribute?: JSONObject;
  /**
   * 当前记录起始索引
   * 当前页
   */
  pageNum?: number;
  /**
   * 每页显示记录数
   * 总页数
   */
  pages?: number;
  /**
   * 每页显示记录数
   * 显示数
   */
  pageSize?: number;
  /**
   * 总数
   */
  total?: number;
  [property: string]: any;
}

/**
 * 游戏商城商品
 *
 * GameMallProductResp
 */
export interface GameMallProductResp {
  /**
   * 分类id 1货币(金币购买货币) 2礼物 3兑换金币(货币兑换金币)
   */
  categoryId?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 游戏id
   */
  gameId?: number;
  /**
   * 商品图标
   */
  icon?: string;
  /**
   * 主键
   */
  id?: number;
  /**
   * 商品名称
   */
  name?: string;
  /**
   * 商品数量
   */
  num?: number;
  /**
   * 商品价格
   */
  price?: number;
  /**
   * 价格图标
   */
  priceIcon?: string;
  /**
   * 价格名称
   */
  priceName?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 商品规格id，如礼物id等
   */
  skuId?: number;
  [property: string]: any;
}

// 购买商品
export interface RequestShopBuy {
  /**
   * 商品分类id
   */
  categoryId?: number;
  /**
   * 游戏id
   */
  gameId?: number;
  /**
   * 商品id
   */
  productId?: number;
  [property: string]: any;
}

/**
 * 商城兑换购、买返回
 * PlayerInfoResp
 */
export interface ResShopBuy {
  /**
   * 分类id 1货币(金币购买货币) 2礼物 3兑换金币(货币兑换金币)
   */
  categoryId?: number;
  /**
   * 剩余金币
   */
  currency?: number;
  /**
   * 剩余魔法石
   */
  energy?: number;
  /**
   * 游戏货币，不同游戏可能有不同的货币值
   */
  gameCurrency?: number;
  /**
   * 商品图标
   */
  icon?: string;
  /**
   * 幸运值
   */
  LuckValue?: number;
  /**
   * 商品名称
   */
  name?: string;
  /**
   * 商品数量
   */
  num?: number;
  /**
   * 兔打扰策略：0不弹 1每次 2每日 3每周 4每月
   */
  pop?: number;
  /**
   * 商品价格
   */
  price?: number;
  /**
   * 价格图标
   */
  priceIcon?: string;
  /**
   * 价格名称
   */
  priceName?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 商品规格id，如礼物id等
   */
  skuId?: number;
  /**
   * 删除状态 1删除 0未删除
   */
  status?: number;
  /**
   * 用户id
   */
  userId?: number;
}

/**
 * BoxConfigResponse
 */
export interface BoxConfigResponse {
  /**
   * 宝箱数组
   */
  boxes?: BoxConfigItem[];
  [property: string]: any;
}

/**
 * com.org.platform.demon.domain.resp.BoxConfigResponse.BoxConfigItem
 *
 * BoxConfigItem
 */
export interface BoxConfigItem {
  /**
   * 宝箱名
   */
  boxName?: string;
  /**
   * 宝箱礼物数组
   */
  gifts?: BoxGiftConfigItem[];
  [property: string]: any;
}

/**
 * com.org.platform.demon.domain.resp.BoxConfigResponse.BoxGiftConfigItem
 *
 * BoxGiftConfigItem
 */
export interface BoxGiftConfigItem {
  /**
   * 礼物名
   */
  giftName?: string;
  /**
   * 礼物价格
   */
  giftPrice?: number;
  /**
   * 概率
   */
  percent?: number;
  [property: string]: any;
}
