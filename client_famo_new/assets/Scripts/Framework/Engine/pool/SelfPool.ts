import { IPool } from './IPool';
import { CCNodePool } from './CCNodePool';
const { ccclass, property } = cc._decorator;

/**
 * 使用opacity方式隐藏对象
 */
// @ccclass('SelfPool')
export class SelfPool implements IPool {
    private list:cc.Node[] = []
    
    private pool:CCNodePool;

    constructor(pool:CCNodePool){
        this.pool = pool;
    }

    get(){
        let go:cc.Node =  this.list.length > 0 ? this.list.shift() : this.pool.get();
        go.opacity = 255;
        return go;     
    }

    getPool(){
        return this.pool
    }

    size(){
        return this.pool.size() + this.list.length;
    }

    /**
     * 
     * @param go 
     * @param nodePool 是否放入NodePool中
     */
    put(go: cc.Node,nodePool:boolean = false){
        if(nodePool){
            this.pool.put(go)
        }else{
            this.list.push(go);
            cc.tween(go).stop();
            go.opacity  = 0;
        }
    }

    clear(){
        this.pool.clear();
        this.list.length = 0;     
    }
}


