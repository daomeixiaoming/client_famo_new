import { SVGADynamicImage, SVGADynamicImageType } from "./svga-player";


export default class SVGAPool {
    private _svgaMark: any = {};
    static _spriteFrames: any = {};
    private _audioClips: any = {};
    static loadKey: any={};
    // public static svgaFrameCaches ={};

    private _getSpriteFrame(name: string, svgaMark: string): cc.SpriteFrame {
        // console.log("===========_getSpriteFrame=============",SVGAPool._spriteFrames[name]);
        if (SVGAPool._spriteFrames[name]) {
            this.pushSvgaMarkData(name, svgaMark);
            return SVGAPool._spriteFrames[name];
        }
        return null;
    }

    private _pushSpriteFrame(name: string, svgaMark: string, sf: cc.SpriteFrame) {
        // console.log("====================_pushSpriteFrame=====================",name);
        SVGAPool._spriteFrames[name] = sf;
        this.pushSvgaMarkData(name, svgaMark);
        sf.addRef();
    }

    private _getAudioClip(name: string, svgaMark: string): cc.AudioClip {
        if (this._audioClips[name]) {
            this.pushSvgaMarkData(name, svgaMark);
            return this._audioClips[name];
        }
        return null;
    }

    private _pushAudioClip(name: string, svgaMark: string, ac: cc.AudioClip) {
        this._audioClips[name] = ac;
        this.pushSvgaMarkData(name, svgaMark);
        ac.addRef();
    }

    pushSvgaMarkData(name: string, svgaMark: string) {
        // console.log("=============pushSvgaMarkData==============");
        if (!this._svgaMark[svgaMark]) {
            this._svgaMark[svgaMark] = {};
        }
        if (!this._svgaMark[svgaMark][name]) {
            this._svgaMark[svgaMark][name] = true;
        }
    }

    getSpriteFrame(dynamicImageData: SVGADynamicImage, svgaMark: string, cb: Function) {
        if (!dynamicImageData || !cb) {
            cc.error("data or callback is null");
            if (cb) {
                cb(null);
            }
            return;
        }
        let spu = "";
        if (dynamicImageData.type == SVGADynamicImageType.RemoteUrl) {
            spu = dynamicImageData.remoteUrl;
        }
        else {
            spu = "data:image/png;base64," + dynamicImageData.base64;
        }
        let key = dynamicImageData.imageKey;
        let sf = this._getSpriteFrame(key, svgaMark);
        // console.log("===============getSpriteFrame=================",sf);
        if (sf) {
            cb(sf);
        }
        else {
            cc.assetManager.loadRemote(spu, { ext: '.png' }, (err, texture: cc.Texture2D) => {
                if (err) {
                    cc.error("image spu", err);
                    cb(null);
                    return;
                }
                // console.log("====getSprite Frame=====",key)
                let sf = new cc.SpriteFrame(texture);
                this._pushSpriteFrame(key, svgaMark, sf);
                cb(sf);
                spu = null;
            });
        }
    }
    getAudioClip(base64Data: string, svgaMark: string, cb: Function) {
        if (!base64Data || !cb) {
            cc.error("data or callback is null");
            if (cb) {
                cb(null);
            }
            return;
        }
        // console.log("===getAudioClip===1==");
        const spu = "data:audio/x-mpeg;base64," + base64Data;
        let ac = this._getAudioClip(spu, svgaMark);
        if (ac) {
            cb(ac);
        }
        else {
            cc.assetManager.loadRemote(spu, { ext: '.mp3' }, (err, ac: cc.AudioClip) => {
                if (err) {
                    cc.error("audio spu", err);
                    cb(null);
                    return;
                }
                this._pushAudioClip(spu, svgaMark, ac);
                cb(ac);
            });
        }
    }

    // 防止释放时，同一个资源在多个svga中使用
    private _getClearListBySvgaMark(svgaMark: string) {
        let clearList: string[] = [];
        if (!this._svgaMark[svgaMark]) {
            return clearList;
        }
        for (let key in this._svgaMark[svgaMark]) {
            let isHave = false;
            for (let key in this._svgaMark) {
                if (key == svgaMark) {
                    continue;
                }
                for (let kk in this._svgaMark[key]) {
                    if (kk == key) {
                        isHave = true;
                        break;
                    }
                }
                if (isHave) {
                    break;
                }
            }
            if (!isHave) {
                clearList.push(key);
            }
        }
        return clearList;
    }

    public clearBySvgaMark(svgaMark: string) {
       
        let clearList = this._getClearListBySvgaMark(svgaMark);
        if (this._svgaMark[svgaMark]) {
            delete this._svgaMark[svgaMark];
        }
        //  console.log("============clearBySvgaMark=========",clearList.length);
        for (let i = 0; i < clearList.length; ++i) {
            if (SVGAPool._spriteFrames[clearList[i]]) {
                SVGAPool._spriteFrames[clearList[i]].getTexture().decRef();
                SVGAPool._spriteFrames[clearList[i]].decRef();
                delete SVGAPool._spriteFrames[clearList[i]];
            }
            if (this._audioClips[clearList[i]]) {
                this._audioClips[clearList[i]].decRef();
                delete this._audioClips[clearList[i]];
            }
        }
    }

    public clearAllBySvgaMark() {
        for (const key in this._svgaMark) {
            this.clearBySvgaMark(key);

            delete this._svgaMark[key];
        }
    }
}
