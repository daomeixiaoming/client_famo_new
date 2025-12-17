import { SVGAParser } from "../svga/svga-parser";
import { SVGASpriteEntity } from "../svga/svga-spriteEntity";
import { SVGAVideoEntity } from "../svga/svga-videoEntity";
import SVGAPool from "./svga-pool";
import { SVGARenderer } from "./svga-renderer";


export enum SVGADynamicImageType {
    SpriteFrame = 0,
    RemoteUrl = 1,
    Base64 = 2,
}

export interface SVGADynamicImage {
    imageKey: string
    type: SVGADynamicImageType
    spriteFrame: cc.SpriteFrame
    remoteUrl: string
    base64: string
}

export interface SVGADynamicTextForm {
    text: string
    size: number
    family: string
    color: cc.Color
    offset: cc.Vec2
}

const { ccclass, property } = cc._decorator;

class SVGAAnimator {
    startValue: number = 0;
    endValue: number = 0;
    duration: number = 0;
    animatorTime: number = 0;
    animatorFrame: number = 0;
    dt: number = 0.16;
    loops: number = 0;
    fillRule: number = 0;
    reverse: boolean = false;
    stop: boolean = false;
}

@ccclass
export default class SVGAPlayer extends cc.Component {

    @property(cc.BufferAsset)
    svgaData: cc.BufferAsset = null;
    @property(cc.Integer)
    loops: number = 1;

    // LIFE-CYCLE CALLBACKS:
    clearsAfterStop: boolean = true;
    fillMode: string = "Forward";

    public rootNode: cc.Node = null;
    public contentLayer: cc.Node = null;
    public videoItem: SVGAVideoEntity = null;
    public dynamicImage = {};
    public dynamicImageTransform = {};
    public dynamicText = {};
    public pool: SVGAPool = null;

    private _renderer: SVGARenderer = null;
    private _onError: Function = null;
    private _animator: SVGAAnimator = null;
    private _contentMode = "AspectFit"
    private _currentFrame = 0;
    private _onFinished = null;
    private _onFrame = null;
    private _onPercentage = null;
    private _clipsToBounds = false;
    private _frame = { x: 0, y: 0, width: 0, height: 0 };
    private _audios: { [key: string]: cc.AudioClip } = {};

    private _isSVGAInit: boolean = false;

    public static svgaAssert = {};

    // onLoad () {}

    start() {

    }

    onDestroy() {
        this.clearSvagPlayer();
    }

    private _initSVGAPlayer(svgaBinData: cc.BufferAsset, autoplay) {

        this.svgaData = svgaBinData;
        if (!this._isSVGAInit) {
            this.rootNode = new cc.Node();
            // this.rootNode.setAnchorPoint(0, 1);
            this.node.addChild(this.rootNode);
            this.contentLayer = new cc.Node();
            // this.contentLayer.setAnchorPoint(0, 1);
            this.rootNode.addChild(this.contentLayer);
            // this.contentLayer.setContentSize(this.node.getContentSize());
            this.pool = new SVGAPool();
            this._renderer = new SVGARenderer(this);

            if (svgaBinData) {
                // console.log("===============_initSVGAPlayer======================",SVGAParser.videoEntitys[svgaBinData.name]);
                if (SVGAParser.videoEntitys[svgaBinData.name]) {
                    let videoItem = SVGAParser.videoEntitys[svgaBinData.name];
                    this.setVideoItem(videoItem);
                    // this.rootNode.setPosition(-videoItem.videoSize.width / 2, videoItem.videoSize.height / 2);
                    if (autoplay !== false) {
                        this.startAnimation(false);
                    }
                    return;
                }

                SVGAParser.load(svgaBinData, (videoItem) => {
                    this._prepareLoadAssets(videoItem, () => {
                        this.setVideoItem(videoItem);
                        // this.rootNode.setPosition(-videoItem.videoSize.width / 2, videoItem.videoSize.height / 2);
                        if (autoplay !== false) {
                            this.startAnimation(false);
                        }
                    })
                }, (err) => {
                    cc.error("initSVGAPlayer err", err);
                    this._onError && this._onError(err);
                })
            }
        }
        this._isSVGAInit = true;


    }

    setVideoBuffer(svgaBinData: cc.BufferAsset, autoplay) {
        this._initSVGAPlayer(svgaBinData, autoplay);
    }

    playSVGA(times = -1) {
        if (!this.svgaData) {
            cc.warn("svgaData is null")
            return
        }
        // this.videoItem = null;
        if (times) {
            this.loops = times;
        }
        if (!this._isSVGAInit) {
            this._initSVGAPlayer(this.svgaData, true);
        }
        else {
            this._currentFrame = 0;
            this.startAnimation(false);
        }
    }

    setVideoItem(videoItem) {
        this._currentFrame = 0;
        this.videoItem = videoItem;
        this.contentLayer.removeAllChildren(true);
        this._prepareAudio();
        this._addLayers();
    }

    startAnimation(reverse: boolean) {
        this.contentLayer.active = true;
        this.stopAnimation(false);
        this._doStart(null, reverse, 0);
    }

    setContentMode(contentMode: string) {
        this._contentMode = contentMode;
        this._update();
    }

    setClipsToBounds(clipsToBounds: boolean) {
        this._clipsToBounds = clipsToBounds;
        this._update();
    }

    setFrame(x, y, width, height) {
        this._frame = { x, y, width, height };
        this._update();
    }

    startAnimationWithRange(range, reverse) {
        this.contentLayer.active = true;
        this.stopAnimation(false);
        this._doStart(range, reverse, 0);
    }

    pauseAnimation() {
        this.stopAnimation(false);
    }

    stopAnimation(clear: boolean) {
        if (this._animator) {
            this._animator.stop = true;
        }

        this.clearsAfterStop = clear;

        if (clear) {
            this._clear();
        }
    }

    private _clear() {
        // if (this.contentLayer) {
        //     this.contentLayer.active = false;
        // }
        // this.videoItem = null;
        // this.clearAudios();
    }

    clearSvagPlayer() {
        this.clearAudios();
        //判断是否需要清除
        if (this.svgaData && this.svgaData.nativeUrl && this.pool) {
            this.pool.clearBySvgaMark(this.svgaData.nativeUrl);
        }

        //清空
        SVGAParser.clearSVG();
    }

    stepToFrame(frame, andPlay) {
        if (frame >= this.videoItem.frames || frame < 0) {
            return;
        }
        this.contentLayer.active = true;
        this.pauseAnimation();
        this._currentFrame = frame;
        this._update();
        if (andPlay) {
            this._doStart(null, false, this._currentFrame)
        }
    }

    stepToPercentage(percentage, andPlay) {
        let frame = parseInt(percentage * this.videoItem.frames as any);
        if (frame >= this.videoItem.frames && frame > 0) {
            frame = this.videoItem.frames - 1;
        }
        this.stepToFrame(frame, andPlay);
    }

    setImage(dynamicImageData: SVGADynamicImage, forKey: string, transform = undefined) {
        this.dynamicImage[forKey] = dynamicImageData;
        if (transform !== undefined && transform instanceof Array && transform.length == 6) {
            this.dynamicImageTransform[forKey] = transform;
        }
        if (this.videoItem) {
            const currentFrame = this._currentFrame;
            this.contentLayer.removeAllChildren(true);
            this._addLayers();
            this._currentFrame = currentFrame;
            this._update();
        }
    }

    setText(textORMap: SVGADynamicTextForm, forKey: string) {
        let text = textORMap.text || "";
        let size = textORMap.size || 14;
        let family = textORMap.family || "Arial";
        let color = textORMap.color || cc.Color.WHITE;
        let offset = textORMap.offset || cc.Vec2.ZERO;
        let textLayer = new cc.Node();
        textLayer.setAnchorPoint(cc.v2(0, 0.5));
        let label = textLayer.addComponent(cc.Label);
        label.fontFamily = family;
        label.string = text;
        label.fontSize = size;
        label.lineHeight = size + 2;
        if (color.a == 255) {
            textLayer.color = color;
        }
        else {
            textLayer.color = cc.color(color.r, color.g, color.b);
            textLayer.opacity = color.a;
        }
        label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        label.verticalAlign = cc.Label.VerticalAlign.CENTER;
        let wtl = textLayer.addComponent(cc.Widget);
        wtl.isAlignHorizontalCenter = true;
        wtl.isAlignVerticalCenter = true;
        wtl.horizontalCenter = offset.x;
        wtl.verticalCenter = offset.y;
        this.dynamicText[forKey] = label;
        if (this.videoItem) {
            const currentFrame = this._currentFrame;
            this.contentLayer.removeAllChildren(true);
            this._addLayers();
            this._currentFrame = currentFrame;
            this._update();
        }
    }

    clearDynamicObjects() {
        this.dynamicImage = {};
        this.dynamicImageTransform = {};
        this.dynamicText = {};
    }

    clearAudios() {
        for (const key in this._audios) {
            delete this._audios[key];
        }
    }

    onError(callback) {
        this._onError = callback;
    }

    onFinished(callback) {
        this._onFinished = callback;
    }

    onFrame(callback) {
        this._onFrame = callback;
    }

    onPercentage(callback) {
        this._onPercentage = callback;
    }

    _doStart(range, reverse, fromFrame) {
        this._animator = new SVGAAnimator();
        this._animator.dt = 1.0 / this.videoItem.FPS;
        if (range) {
            this._animator.startValue = Math.max(0, range.location);
            this._animator.endValue = Math.min(this.videoItem.frames - 1, range.location + range.length);
            this._animator.duration = (this._animator.endValue - this._animator.startValue + 1) * this._animator.dt * 1000;
        }
        else {
            this._animator.startValue = 0;
            this._animator.endValue = this.videoItem.frames - 1;
            this._animator.duration = this.videoItem.frames * this._animator.dt * 1000;
        }
        this._animator.loops = this.loops < 0 ? Infinity : this.loops;
        this._animator.animatorFrame = fromFrame;
        this._animator.fillRule = this.fillMode === "Backward" ? 1 : 0;

        if (reverse === true) {
            this._animator.startValue = fromFrame;
            this._animator.reverse = true;
        }
        else {
            this._animator.startValue = fromFrame;
            this._animator.reverse = false;
        }
    }


    _addLayers() {
        // this.videoItem.sprites.forEach((sprite) => {
        //     this.contentLayer.addChild(this._renderer.requestContentLayer(sprite));
        // })
        let node = new cc.Node();
        let sprite: cc.Sprite = node.addComponent(cc.Sprite);
        this.contentLayer.addChild(node);
        sprite.spriteFrame = null;
        this._currentFrame = 0;
        this._update();
    }

    _resize() {
        let scaleX = 1.0; let scaleY = 1.0; let translateX = 0.0; let translateY = 0.0;
        let targetSize = { width: this._frame.width, height: this._frame.height };
        let imageSize = this.videoItem.videoSize;
        if (this._contentMode === "Fill") {
            scaleX = targetSize.width / imageSize.width;
            scaleY = targetSize.height / imageSize.height;
        }
        else if (this._contentMode === "AspectFit" || this._contentMode === "AspectFill") {
            const imageRatio = imageSize.width / imageSize.height;
            const viewRatio = targetSize.width / targetSize.height;
            if ((imageRatio >= viewRatio && this._contentMode === "AspectFit") || (imageRatio <= viewRatio && this._contentMode === "AspectFill")) {
                scaleX = scaleY = targetSize.width / imageSize.width;
                translateY = (targetSize.height - imageSize.height * scaleY) / 2.0
            }
            else if ((imageRatio < viewRatio && this._contentMode === "AspectFit") || (imageRatio > viewRatio && this._contentMode === "AspectFill")) {
                scaleX = scaleY = targetSize.height / imageSize.height;
                translateX = (targetSize.width - imageSize.width * scaleX) / 2.0
            }
        }

        this.contentLayer.x = this._frame.x + translateX;
        this.contentLayer.y = this._frame.y + translateY;
        this.contentLayer.scaleX = scaleX;
        this.contentLayer.scaleY = scaleY;
    }

    private _prepareLoadAssets(videoItem: any, cb: Function) {
        this.clearAudios();
        console.log("=============_prepareLoadAssets===============");
        let count = 0;
        let maxCount = Object.keys(videoItem.images).length;
        for (var imageKey in videoItem.images) {
            let src = videoItem.images[imageKey];
            if (src.indexOf("SUQz") === 0) {
                this._getAudioClip(src, (ac) => {
                    if (ac) {
                        count++;
                        if (count >= maxCount) {
                            cb();
                        }
                    }
                });
            }
            else {
                let did = {
                    imageKey: imageKey,
                    type: SVGADynamicImageType.Base64,
                    base64: src,
                } as SVGADynamicImage;
                this._renderer.preloadSpriteFrame(did, (sf) => {
                    count++;
                    if (count >= maxCount) {
                        cb();
                    }
                })
            }
        }
    }

    private _prepareAudio() {
        for (var imageKey in this.videoItem.images) {
            let src = this.videoItem.images[imageKey];
            if (src.indexOf("SUQz") === 0) {
                this._getAudioClip(src, (ac) => {
                    if (ac) {
                        this._audios[imageKey] = ac;
                    }
                });
            }
        }
    }

    private _getAudioClip(base64Data, cb) {
        this.pool.getAudioClip(base64Data, this.svgaData.nativeUrl, cb);
    }

    _playAudio(frame) {
        if (this._animator && this._animator.reverse === false && this.videoItem && this.videoItem.audios instanceof Array) {
            // cc.audioEngine.stopAllEffects(); //看情况，是否打开注释
            for (let i = 0; i < this.videoItem.audios.length; i++) {
                const audio = this.videoItem.audios[i];
                if (audio.startFrame === frame && this._audios && this._audios[audio.audioKey]) {
                    cc.audioEngine.playEffect(this._audios[audio.audioKey], false);
                }
            }
        }
    }

    _updateMask() { }

    private _update() {
        if (!this.videoItem) {
            return;
        }
        this._resize();
        this._renderer.drawFrame(this._currentFrame);
        // this._playAudio(this._currentFrame);
    }

    update(dt) {
        if (!this._animator || this._animator.stop) {
            return;
        }
        this._animator.animatorTime += dt;
        let td = this._animator.animatorTime - this._animator.animatorFrame * this._animator.dt;
        if (td < this._animator.dt) {
            return;
        }
        let step = Math.floor(td / this._animator.dt);
        this._animator.animatorFrame += step;
        if (this._animator.reverse) {
            this._currentFrame -= step;
        }
        else {
            this._currentFrame += step;
        }

        if (this._animator.loops != 0) {
            if (this._animator.reverse && this._currentFrame < 0) {
                this._currentFrame += (this._animator.endValue - 1);
                this._animator.loops--;
            }
            else if (!this._animator.reverse && this._currentFrame > this._animator.endValue) {
                this._currentFrame -= (this._animator.endValue + 1);
                this._animator.loops--;
            }
        }
        if (this._animator.loops == 0) {
            this.stopAnimation(true);

            if (this.clearsAfterStop === true) {
                this._clear();
            }
            if (typeof this._onFinished === "function") {
                this._onFinished();
            }

            return;
        }

        this._update()

        if (typeof this._onFrame === "function") {
            this._onFrame(this._currentFrame);
        }
        if (typeof this._onPercentage === "function") {
            let percent = parseFloat(this._currentFrame + 1 as any) / Number(this.videoItem.frames);
            if (this._animator.reverse) {
                this._onPercentage(1 - percent);
            }
            else {
                this._onPercentage(percent);
            }
        }


    }
}
