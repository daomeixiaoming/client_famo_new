import { AtalsCfg, GuiCfg, UICfg } from "./GameConfig";
import { ResCfg } from "./ResConfig";

// 游戏模块加载的资源
export const ResPkg_Home = {
  Atals_Home: [
    {
      assetType: cc.SpriteAtlas,
      urls: [
        AtalsCfg.Home,
      ],
    },
  ],

  Prefab_Home: [
    {
      assetType: cc.Prefab,
      urls: [UICfg.Home],
    },
  ],
};

// 延迟加载的资源
export const ResPkg_Home2 = {
  Prefabs: [
    {
      assetType: cc.Prefab,
      urls: [
        ResCfg.Prefabs.Toast,
        ResCfg.Prefabs.End,
        ResCfg.Prefabs.EndGetBox,
        ResCfg.Prefabs.EndGetBox2,
        ResCfg.Prefabs.EndGetBoxItem,
        ResCfg.Prefabs.EndOpen,
        ResCfg.Prefabs.Help,
        ResCfg.Prefabs.addBetItem,
        ResCfg.Prefabs.NanItem,
        ResCfg.Prefabs.Nan,
        ResCfg.Prefabs.Agree,
        ResCfg.Prefabs.Notice,
        ResCfg.Prefabs.Rank,
        ResCfg.Prefabs.RankDetial,
        ResCfg.Prefabs.RankItem1,
        ResCfg.Prefabs.RankItem2,
        ResCfg.Prefabs.RankPage1,
        ResCfg.Prefabs.RankPage2,
        ResCfg.Prefabs.RankPage3,
        ResCfg.Prefabs.Record,
        ResCfg.Prefabs.RecordItem,
        ResCfg.Prefabs.RewardPrice,
        ResCfg.Prefabs.Shop,
        ResCfg.Prefabs.ShopItem,
        ResCfg.Prefabs.ShopMoney,
        ResCfg.Prefabs.ShopMoneyItem,
      ],
    },
  ],
};
