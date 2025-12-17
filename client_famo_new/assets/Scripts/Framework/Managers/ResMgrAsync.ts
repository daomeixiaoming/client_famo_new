
const { ccclass, property } = cc._decorator;
/***
 * 资源加载，异步模块
 */
@ccclass
export class ResMgrAsync extends cc.Component {
    public static Instance: ResMgrAsync = null;

    csvTables: any = {};  // "表格名字"---> object {key1(第一个字段): row1, ke2: row2}
    csvTableForArr: any = {}; // 表格名字---》array [row1, row2, row3,..]
    tableCast: any = {}; // 存放的是我们这个表格的类型
    tableComment: any = {}; // 存放的是我们表格的注释;

    protected onLoad(): void {
        if (ResMgrAsync.Instance !== null) {
            this.destroy();
            return;
        }
        ResMgrAsync.Instance = this;
    }

    public Init(): void {

    }

    /**
    *   异步加载bundle
    */
    private async IE_LoadBundle(bundleName: string) {
        // DebugUtils.Log("========IE_LoadBundle==========", bundleName);
        return new Promise((resolve, reject) => {
            cc.assetManager.loadBundle(bundleName, (err, bundleData) => {
                if (err) {
                    console.error("========IE_LoadBundle.reject==========", err);
                    reject(null);
                    return;
                }
                else {
                    // DebugUtils.Log("========IE_LoadBundle.resolve==========");
                    resolve(bundleData);
                    return;
                }
            })
        })
    }

    /**
     *加载bundle 里面的所有资源
     * @param bundle 
     * @param assetType 
     * @returns 
     */
    private async IE_LoadAllAssetInBundle(bundle: cc.AssetManager.Bundle, assetType) {
        return new Promise((resolve, reject) => {
            bundle.loadDir('', assetType, (err, infos) => {
                if (err) {
                    reject(err);
                    return;
                }
                else {
                    resolve(infos);
                }
            })
        })
    }

    /**
     * 加载bundle 里面的单个资源
     * @param bundle 
     * @param assetName 
     * @param assetType 
     * @returns 
     */
    private async IE_LoadAssetInBundle(bundle: cc.AssetManager.Bundle, assetName: string, assetType) {
        return new Promise((resolve, reject) => {
            bundle.load(assetName, assetType, (err, assetData) => {
                if (err) {
                    reject(err);
                    return;
                }
                else {
                    resolve(assetData);
                }
            })
        })
    }

    /**
     * 加载bundle 里面的单个场景资源
     * @param bundle 
     * @param sceneName 
     * @returns 
     */
    private async IE_LoadSceneInBundle(bundle: cc.AssetManager.Bundle, sceneName: string) {
        return new Promise((resolve, reject) => {
            bundle.loadScene(sceneName, (err, sceneData) => {
                if (err) {
                    reject(err);
                    return;
                }
                else {
                    resolve(sceneData);
                    return;
                }
            });
        })
    }

    /**
     * 加载bundle 里面的所有资源
     * @param bundleName 
     * @param assetType 
     * @returns 
     */
    public async IE_LoadBundleAndAllAssets(bundleName: string, assetType) {
        var bundle: cc.AssetManager.Bundle = await this.IE_LoadBundle(bundleName) as cc.AssetManager.Bundle;
        if (bundle === null) {
            return null;
        }

        var assetDatas = await this.IE_LoadAllAssetInBundle(bundle, assetType);
        return assetDatas;
    }

    /**
     * 加载bundle 里面的单个场景资源
     * @param bundleName 
     * @param scenePath 
     * @returns 
     */
    public async IE_GetScene(bundleName: string, scenePath: string) {
        var bundle: cc.AssetManager.Bundle = cc.assetManager.getBundle(bundleName);
        if (bundle === null) {
            bundle = await this.IE_LoadBundle(bundleName) as any;
            if (bundle === null) {
                console.error("bundle load err: " + bundleName);
                return;
            }
        }
        var sceneData = await this.IE_LoadSceneInBundle(bundle, scenePath) as any;
        return sceneData;
    }


    /**
     * 获取指定bundle里面的指定资源
     * @param bundleName 
     * @param assetPath 
     * @param assetType 
     * @returns 
     */
    public async IE_GetAsset(bundleName: string, assetPath: string, assetType: any) {
        var bundle: cc.AssetManager.Bundle = cc.assetManager.getBundle(bundleName);
        // console.warn("==========IE_GetAsset============", bundleName, assetPath);
        if (!bundle) {
            bundle = await this.IE_LoadBundle(bundleName) as any;
            // console.warn("==========IE_GetAsset1============", bundle);
            if (bundle === null) {
                console.error("bundle load err: " + bundleName);
                return;
            }
        }
        // console.warn("==========IE_GetAsset3============", bundle, bundleName,assetPath);
        var assetData = bundle.get(assetPath, assetType);
        if (assetData) {
            return assetData;
        }
        // console.warn("==========IE_GetAsset4============", bundle, bundleName,assetPath);
        assetData = await this.IE_LoadAssetInBundle(bundle, assetPath, assetType) as any;
        return assetData;
    }

    /***
     * 
     */
    public ReleaseAsset(assetData: cc.Asset): void {
        cc.assetManager.releaseAsset(assetData);
    }

    /**
     * 释放bundle 里面的所有资源
     * @param bundleName 
     * @returns 
     */
    public ReleaseAllAssetInBundle(bundleName: string): void {
        var bundle: cc.AssetManager.Bundle = cc.assetManager.getBundle(bundleName);
        if (bundle === null) {
            return;
        }

        bundle.releaseAll();

        cc.assetManager.removeBundle(bundle);
    }
}
