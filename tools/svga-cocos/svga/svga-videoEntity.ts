import { SVGASpriteEntity } from './svga-spriteEntity'
import SVGAProto from './svga-proto';

export class SVGAVideoEntity {

    /**
     * SVGA 文件版本
     */
    version = "";

    /**
     * 影片尺寸
     */
    videoSize = {
        width: 0.0,
        height: 0.0,
    };

    /**
     * 帧率
     */
    FPS = 20;

    /**
     * 帧数
     */
    frames = 0;

    /**
     * Bitmaps
     */
    images = {};

    /**
     * SpriteEntity[]
     */
    sprites = []
    //每帧 图片
    frameImages=[];

    /**
     * AudioEntity[]
     */
    audios = []

    constructor(spec, images) {

        if (typeof spec === "object" && spec.$type == SVGAProto.getInstance().getProtoMovieEntity()) {
            if (typeof spec.params === "object") {
                this.version = spec.ver;
                this.videoSize.width = spec.params.viewBoxWidth || 0.0;
                this.videoSize.height = spec.params.viewBoxHeight || 0.0;
                this.FPS = spec.params.fps || 20;
                this.frames = spec.params.frames || 0;
            }
            this.resetSprites(spec);
            this.audios = spec.audios;
        }
        else if (spec) {
            if (spec.movie) {
                if (spec.movie.viewBox) {
                    this.videoSize.width = parseFloat(spec.movie.viewBox.width) || 0.0;
                    this.videoSize.height = parseFloat(spec.movie.viewBox.height) || 0.0;
                }
                this.version = spec.ver;
                this.FPS = parseInt(spec.movie.fps) || 20;
                this.frames = parseInt(spec.movie.frames) || 0;
            }
            this.resetSprites(spec);
        }
        if (images) {
            this.images = images
        }
    }

    resetSprites(spec) {
        if (spec.sprites instanceof Array) {
            let sprites = spec.sprites;
            this.frameImages =[];
            // for(let i=0;i<this.frames;i++){
            //     this.frameImages[i] =[];
            // }
            // 每帧显示的图片
            for(let i=0;i<sprites.length;i++){
                let frames = sprites[i].frames;
                let imageKey = sprites[i].imageKey;
                for(let j=0;j<frames.length;j++){
                    let frame = frames[j];
                    if(frame.alpha){
                        this.frameImages[j]=imageKey;
                    }
                }
            }
            // this.sprites = spec.sprites.map((obj) => {
            //     return new SVGASpriteEntity(obj)
            // })
        }
    }

}