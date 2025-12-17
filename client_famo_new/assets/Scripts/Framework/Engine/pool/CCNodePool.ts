import { IPool } from "./IPool";
const { ccclass, property } = cc._decorator;

// @ccclass('CCNodePool')
export class CCNodePool implements IPool {
    private pool: cc.NodePool;

    private resItem: cc.Prefab;

    private name: string = ''


    /**
     * 
     * @param prefab 预制体
     * @param conut 初始化个数
     */
    constructor(name: string, resItem: cc.Prefab, conut: number) {
        this.name = name
        this.pool = new cc.NodePool();
        this.resItem = resItem;
        for (let i = 0; i < conut; i++) {
            let obj: cc.Node = this.getNode(); // 创建节点
            this.pool.put(obj); // 通过 putInPool 接口放入对象池
        }
    }

    getName() {
        return this.name
    }

    get() {
        let go: cc.Node = this.pool.size() > 0 ? this.pool.get() : this.getNode();
        return go;
    }

    getNode() {
        if(this.resItem){
            return cc.instantiate(this.resItem);
        }else{
            console.error(' 预制体没有赋值 ')
            return null;
        }
    }

    size() {
        return this.pool.size();
    }

    put(go: cc.Node) {
        this.pool.put(go);
    }

    clear() {
        this.pool.clear();
    }
}


