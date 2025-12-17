import DebugUtils from "../Utils/DebugUtils";

const { ccclass, property } = cc._decorator;

@ccclass
export class ResMgr extends cc.Component {

    public static Instance: ResMgr = null as unknown as ResMgr;

    private totalAb: number = 0;
    private nowAb: number = 0;

    private now: number = 0;
    private total: number = 0;

    onLoad(): void {
        if (ResMgr.Instance === null) {
            ResMgr.Instance = this;
        } else {
            this.destroy();
            return;
        }
    }

    private loadAndRef(abBundle: cc.AssetManager.Bundle, url: string, typeAsset: any, progress: Function, endFunc: Function): void {
        abBundle.load(url, typeAsset, (err: any, asset: cc.Asset) => {
            if (err) {
                // console.error("load assets: ", url);
                console.error(`assetType: ${typeAsset.name} ,load asset success：${url}`);
                return;
            }
            DebugUtils.Log(`assetType:== ${typeAsset.name},load asset success：${url}`);
            this.now++;
            if (progress) {
                progress(this.now, this.total);
            }
            if (this.now >= this.total) {
                if (endFunc) {
                    endFunc();
                }
            }
        });
    }

    /**
     * 
     * @param abBundle 包名
     * @param typeAsset  资源类型
     * @param urls 对应类型的资源数组
     * @param progress 
     * @param endFunc 
     */
    private loadAssetsInUrls(abBundle: cc.AssetManager.Bundle, typeAsset: any, urls: Array<string>, progress: Function, endFunc: Function): void {
        for (let i = 0; i < urls.length; i++) {
            this.loadAndRef(abBundle, urls[i], typeAsset, progress, endFunc);
        }
    }

    private releaseAssetsInUrls(abBundle: cc.AssetManager.Bundle, typeAsset: any, urls: Array<string>): void {
        for (let i = 0; i < urls.length; i++) {
            // DebugUtils.Log("============releaseAssetsInUrls1111==============",urls[i]);
            if (urls[i] === "boss") {
                // DebugUtils.Log("======releaseAssetsInUrls==========");
            }
            let asset: cc.Asset = abBundle.get(urls[i], typeAsset) as cc.Asset;
            if (!asset) {
                continue;
            }
            // 释放资源
            DebugUtils.Log("releaseAssetsInUrls = " + asset.refCount, "  ", typeAsset.name);

            // DebugUtils.Log("===========releaseAssetsInUrls===============", urls[i]);
            cc.assetManager.releaseAsset(asset);
        }
    }

    private preloadAssetsInAssetsBundles(resPkg: any, progress: Function, endFunc: Function): void {
        for (var key in resPkg) {
            var abBundle: cc.AssetManager.Bundle = cc.assetManager.getBundle(key) as cc.AssetManager.Bundle;
            if (!abBundle) {
                DebugUtils.Log("===========preloadAssetsInAssetsBundles 已加载=============", key);
                continue;
            }

            if (resPkg[key] instanceof Array) {
                for (let i = 0; i < resPkg[key].length; i++) {
                    // let info: any = abBundle.getDirWithPath("/");
                    // DebugUtils.Log(info);
                    let assetType = resPkg[key][i].assetType;
                    let urls = resPkg[key][i].urls;
                    this.loadAssetsInUrls(abBundle, assetType, urls, progress, endFunc);
                }
            }
            else {
                let typeAsset = resPkg[key];
                let infos = abBundle.getDirWithPath("/");
                let urls: any = [];
                for (let i = 0; i < infos.length; i++) {
                    urls.push(infos[i].path);
                }

                this.loadAssetsInUrls(abBundle, typeAsset, urls, progress, endFunc);
            }
        }
    }

    /*
    var resPkg = {
        "Ab包名字": [
            { typeAsset: 资源类型, urls: []},
            { typeAsset: 资源类型, urls: []},
            ...
        ],

        "Ab包名字": 资源类型, 表示整包ab包按照一个类型加载;
        ... ..
    };

    progress(now, total)

    */
    public preloadResPkg(resPkg: any, progress: Function, endFunc: Function): void {
        // DebugUtils.Log("=========================ResMgr.preloadResPkg===================", resPkg);
        this.totalAb = 0;
        this.nowAb = 0;

        this.total = 0;
        this.now = 0;

        for (var key in resPkg) {
            this.totalAb++;

            if (resPkg[key] instanceof Array) {
                for (let i = 0; i < resPkg[key].length; i++) {
                    this.total += resPkg[key][i].urls.length;
                }
            }
        }

        // 加载ab包
        for (var key in resPkg) {
            var abBundle: cc.AssetManager.Bundle = cc.assetManager.getBundle(key) as cc.AssetManager.Bundle;
            // DebugUtils.Log("============preloadResPkg 加载==========",key);
            cc.assetManager.loadBundle(key, (err, bundle: cc.AssetManager.Bundle) => {
                if (err) {
                    console.error("load bundle erro: ", key, err);
                    return;
                }

                this.nowAb++;
                if (!(resPkg[key] instanceof Array)) {
                    let infos = bundle.getDirWithPath("/");
                    this.total += (infos.length);
                }

                if (this.nowAb >= this.totalAb) { // ab包加载完毕
                    this.preloadAssetsInAssetsBundles(resPkg, progress, endFunc);
                }
            });
        }
        // end
    }

    /**
     * 释放资源
     * @param resPkg 
     */
    public releaseResPkg(resPkg: any): void {
        for (var key in resPkg) {
            let abBundle: cc.AssetManager.Bundle = cc.assetManager.getBundle(key) as cc.AssetManager.Bundle;
            if (!abBundle) {
                continue;
            }

            if (resPkg[key] instanceof Array) {
                for (let i = 0; i < resPkg[key].length; i++) {
                    this.releaseAssetsInUrls(abBundle, resPkg[key][i].assetType, resPkg[key][i].urls);
                }
            } else {
                let typeAsset = resPkg[key];
                let infos = abBundle.getDirWithPath("/");
                let urls: any = [];
                for (let i = 0; i < infos.length; i++) {
                    urls.push(infos[i].path);
                }
                this.releaseAssetsInUrls(abBundle, typeAsset, urls);
            }
            DebugUtils.Log("releaseResPkg = ", abBundle.name);
            // 释放ab包
            cc.assetManager.removeBundle(abBundle);
        }
    }

    public preloadAsset(abName: string, url: string, typeClass: any, endFunc: Function): void {
        cc.assetManager.loadBundle(abName, (err, abBundle: cc.AssetManager.Bundle) => {
            if (err) {
                console.error(err);
                return;
            }

            abBundle.load(url, typeClass, (err, asset: cc.Asset) => {
                if (err) {
                    console.error(err);
                    return;
                }

                if (endFunc) {
                    endFunc();
                }
            });
        });
    }

    public releaseAsset(abName: string, url: string): void {
        var abBundle: cc.AssetManager.Bundle = cc.assetManager.getBundle(abName) as cc.AssetManager.Bundle;
        if (!abBundle) {
            return;
        }

        abBundle.release(url);
    }

    // 同步接口, 前面已经加载好了的资源;
    /**
     * 
     * @param abName ab包名
     * @param url 资源路径
     * @param assetType 资源类型
     * @returns 
     */
    public getAsset(abName: string, url: string, assetType: any): any {
        var abBundle: cc.AssetManager.Bundle = cc.assetManager.getBundle(abName) as cc.AssetManager.Bundle;
        if (!abBundle) {
            return null;
        }

        return abBundle.get(url, assetType);
    }
}
