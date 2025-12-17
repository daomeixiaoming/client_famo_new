// 自定义消息的key
export const EventKey = {
  Native_GetLiveInfo: "Native_GetLiveInfo", //获取主播信息
  Native_AppInfo: "Native_AppInfo", //获取app信息
  Native_UserInfo: "Native_UserInfo", //获取用户信息

  Start_EnterGame: "Start_EnterGame", //通知开始游戏初始化

  // http 消息
  Http_Msg_ShopBuyRes: "Http_Msg_ShopBuyRes", //购买宝箱返回
  Http_Res_GetPlayerInfo: "Http_Res_GetPlayerInfo",
  Http_Res_GetShopList: "Http_Res_GetShopList", //获取伐魔商城列表
  Http_Res_GetShopMoneyList: "Http_Res_GetShopMoneyList", //获取破魔券商城列表
  Http_Res_EnterHome: "Http_Res_EnterHome", //请求 enterHome消息
  Http_Res_Atk: "Http_Res_Atk", //请求 攻击消息返回
  Http_Res_OpenBoxRes: "Http_Res_OpenBoxRes", //开宝箱返回
  Http_Res_RankPage3: "Http_Res_RankPage3", //伤害版数据
  Http_Res_RankPage1: "Http_Res_RankPage1", //排行榜昨日今日数据
  Http_Res_GetRankDetial: "Http_Res_GetRankDetial", //获取讨伐记录榜
  Http_Res_GetRecordList: "Http_Res_GetRecordList", //获取中奖记录
  Http_Res_GetBoxConfig: "Http_Res_GetBoxConfig", //宝箱配置

  //ws 长链接消息
  WS_UpdateBoss: "WS_UpdateBoss", //更新Boss消息
  WS_RewardBox: "WS_RewardBox", //Boss 死亡开启宝箱

  Update_ExorcismVoucher: "Update_ExorcismVoucher", //跟新破魔券
  Update_Currency: "Update_Currency", //跟新金币

  //UI事件
  UI_ShowLogin: "UI_ShowLogin", //显示登录
  UI_LoadNoticeOver: "UI_LoadNoticeOver", //加载Notice 资源包结束
  UI_Agree_True: "UI_Agree_True", //玩法公约点击同意
  UI_Notice_True: "UI_Notice_True", //玩法点击同意

  UI_UpdateWaitTime: "UI_UpdateWaitTime", //更新等待时间
  UI_UpdateWaitTimeOver: "UI_UpdateWaitTimeOver", //更新等待时间结束

  UI_ShowShop: "UI_ShowShop", //显示兑换商城
  UI_ShowShopMoney: "UI_ShowShopMoney", //显示破魔券商城
  UI_ShowLoading: "UI_ShowLoading", //显示加载界面
  UI_Loading: "UI_Loading", //显示加载进度
  UI_LoadingEnd: "UI_LoadingEnd", //显示加载进度
  UI_GotoLogin: "UI_GotoLogin", //大厅返回到登录页
  UI_ClickAni: "UI_ClickAni", //点击事件
  UI_RankShowDetial: "UI_RankShowDetial", //排行榜显示伤害详情
  UI_RankNanData: "UI_RankNanData", //排行无数据
  UI_EnterGame: "UI_EnterGame", //进入游戏
  UI_UpadteBtnStatus: "UI_UpadteBtnStatus", //显示登录

  // 测试数据
  TEST_ShopMoney: "TEST_ShopMoney", //伏魔券商城数据
  TEST_Shop: "TEST_Shop", //伏魔商城数据
};
