import { CCNodePool } from './CCNodePool';
import { SelfPool } from './SelfPool';
const { ccclass } = cc._decorator;

// @ccclass('CCPoolManager')
export class CCPoolManager extends cc.Component {
    private static ins: CCPoolManager;

    static instance(): CCPoolManager {
        if (!this.ins) {
            this.ins = new CCPoolManager();
        }
        return this.ins;
    }

    //对象池表
    private pools = {};
    // 对象名称 和给定 key的 映射表 这样在回收对象的时候就不需要传入key了。通过节点的name就可以找到key。
    private nameMap = {};


    init(key: string, resItem: cc.Prefab, count: number) {
        if (!this.pools[key]) {
            this.pools[key] = new SelfPool(new CCNodePool(key, resItem, count))
        }
    }


    getPool(key: string) {
        return this.pools[key].getPool();
    }

    get(key: string): cc.Node {

        if (this.pools[key]) {
            let go: cc.Node = this.pools[key].get();
            if (!this.nameMap[go.name] && go.name != key) {
                this.nameMap[go.name] = key;
            }
            return go;
        }
        return null;
    }


    put(go: cc.Node, nodePool: boolean = false) {

        let key = this.nameMap[go.name];

        if (!key) {
            key = go.name;
        }

        if (!this.pools[key]) {
            cc.warn(" not have  name ", key, ' ,go.name ', go.name);
            return;
        }
        this.pools[key].put(go, nodePool);
    }

    clear(name: string) {
        if (this.pools[name]) {
            this.pools[name].clear();
            this.pools[name] = null;
        }
    }
    clealAll() {
        for (const key in this.pools) {
            this.clear(key);
        }
        this.pools = {};
    }
}


