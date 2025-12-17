export const ResCfg = {
  Prefabs: {
    // 通用模块需要加载的预制体
    Toast: "Common/Toast", //提示框
    // 商城模块
    Shop: "Shop/Shop", //兑换商城
    ShopItem: "Shop/ShopItem",
    ShopMoney: "Shop/ShopMoney", //破魔券商城
    ShopMoneyItem: "Shop/ShopMoneyItem",

    Loading: "Notice/Loading", //加载进度界面
    Notice: "Notice/Notice", //玩法公告
    Agree: "Notice/Agree", //玩法公约

    //排行榜
    Rank: "Rank/Rank",
    RankItem1: "Rank/RankItem1",
    RankItem2: "Rank/RankItem2",
    RankDetial: "Rank/RankDetial", //伤害详情
    RankPage1: "Rank/RankPage1",
    RankPage2: "Rank/RankPage2",
    RankPage3: "Rank/RankPage3",
    //个人记录
    Record: "Record/Record",
    RecordItem: "Record/RecordItem",
    //活动说明
    Help: "Help/Help",

    // Home
    addBetItem: "Home/addBetItem",
    NanItem: "Home/nanItem",
    Nan: "Nan/Nan", //破魔石不足的提示界面

    // 結算
    End: "End/End", //Boss 死亡弹出的获取宝箱界面
    EndGetBox: "End/EndGetBox", //开完宝箱获取额度奖励界面，开启全部的
    EndGetBox2: "End/EndGetBox2", //开启单个奖励的
    EndGetBoxItem: "End/EndGetBoxItem",
    EndOpen: "End/EndOpen", //点击宝箱弹出的  获取宝箱界面

    // 配置
    RewardPrice: "RewardPrice/RewardPrice",
  },

  // 音效文件
  VoiceCfg: {
    bg_music: "bg_music", //背景音乐
    atk_500: "atk_500", //500攻击音效
    atk_2500: "atk_2500", //2500攻击音效
    atk_5000: "atk_5000", //5000攻击音效
    click: "click", //按钮点击音效
    get_box: "get_box", //获得宝箱音效
  },
};

/** spine 动画资源 */
export const SpineCfg = {
  /** boss动画 */
  sp_boss: "sp_boss1/sp_boss",
  /** 底座光 */
  sp_light: "sp_light/sp_light",
  /** 血条动画 */
  sp_hp: "sp_hp/sp_hp",

  /** 500攻击 */
  sp_atk500: "sp_atk500/sp_atk500",
  /** 2500攻击 */
  sp_atk2500: "sp_atk2500/sp_atk2500",
  /** 5000攻击 */
  sp_atk5000: "sp_atk5000/sp_atk5000",

  /** 点击动销 */
  sp_click: "sp_click/sp_click",
}


