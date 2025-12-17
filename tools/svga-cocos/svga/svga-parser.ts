import { SVGAVideoEntity } from './svga-videoEntity'
import SVGAMockWorker from './svga-mockWorker'

export class SVGAParser {
    static videoEntitys={}
    /**
     * arraybuffer: 资源data
     * success(VideoEntity videoItem)
     */
    public static load(svgaBinData: cc.BufferAsset, success: Function, failure: Function) {
        const arraybuffer = svgaBinData['_buffer'];
        if(SVGAParser.videoEntitys[svgaBinData.name]){
            return success(SVGAParser.videoEntitys[svgaBinData.name]);
        }
        SVGAMockWorker.getInstance().loadAssets(arraybuffer, (data) => {
            let movie = data.movie;
            let images = data.images;
            // console.log("====loadAssets======",data)
            let videoItem = new SVGAVideoEntity(movie, images);
            SVGAParser.videoEntitys[svgaBinData.name] = videoItem
            success(videoItem);
        }, failure);
    }

    public static clearSVG(){
        SVGAParser.videoEntitys = {};
    }
}