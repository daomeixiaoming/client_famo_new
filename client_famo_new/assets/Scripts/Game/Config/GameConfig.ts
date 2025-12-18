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
  gameType: 118, // 游戏类型
  roomId: 1000013, // 房间id
  anchorId: 153, //主播id
  token: "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjozMTcsImxvZ2luX3R5cGUiOjEsInVzZXJfa2V5IjoiNTZhOWJiNjktOThkNC00MjlkLWIzYmMtZTlhMDVlYWRjODIxIiwidG9rZW5fdHlwZSI6ImFwcCIsInVzZXJuYW1lIjoi55So5oi3MzE3NDM5In0.fYHgcBXjtHha7eUK0i96Hh48EVCcKq-dCZvxRj14eEiwWzgncdSb4YQQnUr_OTRzA-Mv0AyaQwrJiORGGWaFTw",
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

// 散图
export const GuiCfg = {
  login_bg: "login_bg",
  home_bg: "Bg/home_bg",
  home_bgGunag_1: "Bg/home_bgGunag_1",
  nan_bg: "Bg/nan_bg",
  end_bg1: "End/end_bg1",
  end_bg2: "End/end_bg2",
  shop_bg: "Shop/shop_bg",
  shop_bg2: "Shop/shop_bg2",
};

// AB包名
export const AbNames = {
  Gui_Login: "Gui_Login",
  Gui_Home: "Gui_Home",

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
  AgreeNotice: "還未同意協議！",
  ShopTip1: "購買成功！當前破魔券數量：",
  ShopTip2: "兌換成功！禮物已放入您的背包成功！",
  ShopTip3: "破魔券不足！",
  ShopTip4: "金币不足！",
  ShopTip5: "兌換成功！",
  BoxNan: "寶箱數量不足！",
  GetBoxDes1: "在黃白銀箱中開啟",
  GetBoxDes2: "在黃金寶箱中開啟",
  GetBoxDes3: "在鑽石寶箱中開啟",
  EndOpen1: "當前白银寶箱數量",
  EndOpen2: "當前鑽石寶箱數量",
  EndOpen3: "當前黃金寶箱數量",
  One: "個",
  GetBox1: "您獲得白銀寶箱",
  GetBox2: "您獲得黃金寶箱",
  GetBox3: "您獲得鑽石寶箱",
  RankDes1: "結束時間：",
  RankDes2: "暫無排行",
  Box_BY: "白銀",
  Box_HJ: "黃金",
  Box_ZS: "鑽石",
  BossDied: "惡魔Boss已被消滅",
  TextPMQ: "破魔券",
  RankTimeStart: "開始時間",
  RankTimeEnd: "結束時間",
  RankHurt: "傷害值：",
  MsgPop1: "恭喜",
  MsgPop2: "獲得",
  MsgPop3: "破魔券",
  GetPlayerInfoErr: "獲取玩家資訊失敗!",
  RewardDes1: "暫無記錄",
  RewardPriceDes: `每日攻擊傷害排行榜獎勵：`,

  //玩法公告
  Notice: `本功能玩法不向未成年人開放，未成年人用戶請勿參與。
1. 本平台玩法均為提升用戶體驗設計，任何用戶和主播均不得利用平台玩法實施任何違法犯罪的行為或用於任何違法犯罪的用戶;
2. 本平台玩法中獲得的禮物和獎勵僅限於在平台內消費，禁止房主、主持、用戶及其他第三方主體進行任何形式的背包禮物交易;
3. 健康遊戲，理性消費，如存在上述行為，平台將嚴格按照平台規則採取相關管理措施.`,
  Notice_Txt1: "我已閱讀並同意",
  Notice_Txt2: "《玩法須知和公約》",
  Notice_Txt3: "今日不再彈出",
  //玩法须知和公约
  Agree: `1、透過機率獲得的隨機禮物僅限於在平台內消費，不得以任何形式兌換成法定貨幣、現金或其他任何具有交換價值的物品或服務，禁止主播、主播所在公會、用戶及其他第三方主體進行任何形式的禮物交易，否則平台將嚴格按照平台規則對相關用戶採取相關管理措施，用戶應自行對此承擔法律責任及相關損失。請用戶謹防上當受騙。
2、本功能玩法不向未成年人開放，未成年人用戶請勿參與，平台將通過大數據和實名認證等方式實時跟蹤，確保此功能不會被未成年人使用。直播間內主播、主播所在公會以及房間其他用戶禁止引導未成年人用戶參與本功能玩法，引導未成年人參與本功能玩法將受到平台嚴厲打擊和處罰。
3、機率禮物是提升房間內互動體驗的功能，僅供娛樂交流使用。直播間內主播、主播所在公會以及其他任何主體均不得以任何非法目的與方式（包括但不限於賭博、詐騙等）對其進行使用。
4、禁止使用機率禮物玩法實施任何影響互動公平性的行為，或利用產品BUG等不正當手法參與互動，一旦發生上述情況，平台有權取消發放對應獎勵，追回獎勵，對情節嚴重的，平台保留一切追充法律責任的權利。
5、用戶不得以任何不正當手段或舞弊的方式參與本功能玩法，一經發現，平台有權取消用戶的參與資格，並有權收回用戶獲得的禮物及權益，同時保留追究其相關法律責任的權利。不正當手段及舞弊行為包括但不限於：下載非官方客戶端、使用插件、外掛等非法工具掃碼、下載、安裝、註冊、登錄、使用；篡改設備數據；惡意牟利等擾亂平台秩序；使用插件、外掛系統或第三方工具對本平台及本活動進行干擾、破壞、修改或施加其他影響及平台認為的其他不正當手段。
6、因用戶操作不當或用戶所在區域網絡故障、支付平台網絡故障、電信運營商故障、第三方其他平台限制等非平台所能控制的原因導致的用戶無法參與活動、或參與失敗，平台無需為此承擔任何法律責任。
7、平台可能在房間、功能頁展示用戶賬號信息及所獲得的隨機禮物等信息，您授權並同意平台為此使用並展示您的公開帳號信息（如頭像、暱稱等）及所獲得隨機禮物等信息。
8、平台依法運營此功能玩法，如因不可抗力、情勢變更，相關政策變動、政府機關指令要求等原因導致本功能玩法調整、暫停舉辦或無法進行的，平台有權隨時決定修改、暫停、取消或終止本功能玩法，並無需為此承擔任何法律責任。`,
};
