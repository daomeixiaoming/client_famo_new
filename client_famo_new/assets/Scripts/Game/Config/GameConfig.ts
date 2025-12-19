let IP = "192.168.3.225";
// 网络配置
// CC_DEBUG = false;
export const NetCfg = {
  IP: IP, //IP 本地127.0.0.1 本地测试10.0.0.151
  PORT: 6086, //端口
  // 长连接
  wss: CC_DEBUG
    ? "wss://api-test.liveboxs.live/game/ws/ws"
    : "wss://api.liveboxs.live/game/ws/ws",
  url: CC_DEBUG
    ? "https://api-test.liveboxs.cn/game/"
    : "https://api.liveboxs.cn/game/",
  gameType: 118,  // 游戏类型
  roomId: 1000013, // 房间id
  anchorId: 153,  // 主播id
  token: "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjozMTcsImxvZ2luX3R5cGUiOjEsInVzZXJfa2V5IjoiYTA4NzQzOTEtNjY1Yy00NWEzLWFhNDYtMjg5NGMzNzJiNmJlIiwidG9rZW5fdHlwZSI6ImFwcCIsInVzZXJuYW1lIjoi55So5oi3MzE3NDM5In0.NdLppS8YC_9IgBbtrELqZj7_t6tt1puzYIJs5pJHrgzpYr6nx0861ILR95pl7NAPbh_XqX9cDSim1TtKGGUGpw",
};

// 15623252001
// 10000317

// 游戏配置
export const GameConfig = {
  isDebug: true, //是否是debug 模式
};

// UI预制体文件
export const UICfg = {
  //登录模块加载的资源
  Login: "Login", //登录页面
  // 进入游戏必须加载的资源
  Home: "Home/Home",
};

// 图集
export const AtalsCfg = {
  Home: "Home",
  // Shop: "Shop",
  Boss1: "Boss/boss1",
  Boss2: "Boss/boss2",
  Boss3: "Boss/boss3",
  Boss4: "Boss/boss4",
};

// 延迟加载的图集
export const Atals1Cfg = {
  HomeCom: "HomeCom",
  End: "End",
  Rank: "Rank",
};

// AB包名
export const AbNames = {
  Gui_Login: "Gui_Login",
  Gui_Home: "Gui_Home",

  /** 散图 */
  Gui: "Gui",

  Atals_Home: "Atals_Home",
  Atals1: "Atals1",
  Prefabs: "Prefabs", //通用模块

  Prefab_Home: "Prefab_Home",
  Prefab_Login: "Prefab_Login",

  Svga_Common: "Svga_Common",

  Sounds: "Sounds",

  /** 骨骼动画 */
  Spine: "Spine",
};

// 排行的数据结构
export interface RankData {
  lv: number; //等级
  head: string; //头像url
  name: string; //用户名
  num: number; //次数
  score: number; //得分
}

// 活动说明 start
export interface HelpDataItem {
  des: string; //字符串数据
  color: string; //颜色
}

// 网络状态code
export const NetStatus = {
  Normal: 200, //正常
  CURRENCY_NOT_ENOUGH: -232, //货币不够!
  NO_BOX: -231, //没有宝箱了!
  B0X_NOT_FOUND: -230, //宝箱不存在!
};

export const Lngs = {
  AgreeNotice: "还未同意协议！",
  ShopTip1: "购买成功！当前冰钻数量：",
  ShopTip2: "兑换成功！礼物已成功放入您的背包！",
  ShopTip3: "冰钻不足！",
  ShopTip4: "金币不足！",
  ShopTip5: "兌換成功！",
  BoxNan: "宝箱数量不足！",
  GetBoxDes1: "在皮宝囊中开启",
  GetBoxDes2: "在银宝囊中开启",
  GetBoxDes3: "在金宝囊中开启",
  EndOpen1: "当前皮宝囊数量",
  EndOpen2: "当前金宝囊数量",
  EndOpen3: "当前银宝囊数量",
  One: "个",
  GetBox1: "您获得皮宝囊",
  GetBox2: "您获得银宝囊",
  GetBox3: "您获得金宝囊",
  RankDes1: "结束时间：",
  RankDes2: "暂无排行",
  Box_BY: "皮宝囊",
  Box_HJ: "银宝囊",
  Box_ZS: "金宝囊",
  BossDied: "当前Boss已被消灭!",
  TextPMQ: "冰钻",
  RankTimeStart: "开始时间",
  RankTimeEnd: "结束时间",
  RankHurt: "伤害值：",
  MsgPop1: "恭喜",
  MsgPop2: "获得",
  MsgPop3: "冰钻",
  GetPlayerInfoErr: "获取玩家信息失败!",
  RewardPriceDes: `每日攻击伤害排行榜奖励：`,

  //玩法公告
  Notice: `本功能玩法不向未成年人开放，未成年人用户请勿参与。
1. 本平台玩法均为提升用户体验而设计，任何用户和主播均不得利用平台玩法实施任何违法犯罪行为或用于任何违法犯罪用户；
2. 本平台玩法中获得的礼物和奖励仅限于在平台内消费，禁止房主、主持、用户及其他第三方主体进行任何形式的背包礼物交易；
3. 健康游戏，理性消费，如发生上述行为，平台将严格按照平台规则采取相关管理措施。`,
  Notice_Txt1: "我已阅读并同意",
  Notice_Txt2: "《玩法须知和公约》",
  Notice_Txt3: "今日不再弹出",
  //玩法须知和公约
  Agree: `1、透过机率获得的随机礼物仅限于在平台内消费，不得以任何形式兑换成法定货币、现金或其他任何具有交换价值的物品或服务，禁止主播、主播所在公会、用户及其他第三方主体进行任何形式的礼物交易，否则平台将严格按照平台规则对相关用户采取相关管理措施，用户应自行对此承担法律责任及相关损失。请用户谨防上当受骗。
2、本功能玩法不向未成年人开放，未成年人用户请勿参与，平台将通过大数据和实名认证等方式实时跟踪，确保此功能不会被未成年人使用。直播间内主播、主播所在公会以及居室其他用户禁止引导未成年人用户参与本功能玩法，引导未成年人参与本功能玩法将受到平台严厉打击和处罚。
3、机率礼物是提升居室内互动体验的功能，仅供娱乐交流使用。直播间内主播、主播所在公会以及其他任何主体均不得以任何非法目的与方式（包括但不限于赌博、诈骗等）对其进行使用。
4、禁止使用机率礼物玩法实施任何影响互动公平性的行为，或利用产品BUG等不正当手法参与互动，一旦发生上述情况，平台有权取消发放对应奖励，追回奖励，对情节严重的，平台保留一切追充法律责任的权利。
5、用户不得以任何不正当手段或舞弊的方式参与本功能玩法，一经发现，平台有权取消用户的参与资格，并有权收回用户获得的礼物及权益，同时保留追究其相关法律责任的权利。不正当手段及舞弊行为包括但不限于：下载非官方客户端、使用插件、外挂等非法工具扫码、下载、安装、注册、登录、使用；篡改设备数据；恶意牟利等扰乱平台秩序；使用插件、外挂系统或第三方工具对本平台及本活动进行干扰、破坏、修改或施加其他影响及平台认为的其他不正当手段。
6、因用户操作不当或用户所在区域网络故障、支付平台网络故障、电信运营商故障、第三方其他平台限制等非平台所能控制的原因导致的用户无法参与活动、或参与失败，平台无需为此承担任何法律责任。
7、平台可能在居室、功能页展示用户账号信息及所获得的随机礼物等信息，您授权并同意平台为此使用并展示您的公开帐号信息（如头像、昵称等）及所获得随机礼物等信息。
8、平台依法运营此功能玩法，如因不可抗力、情势变更，相关政策变动、政府机关指令要求等原因导致本功能玩法调整、暂停举办或无法进行的，平台有权随时决定修改、暂停、取消或终止本功能玩法，并无需为此承担任何法律责任。`,
};
