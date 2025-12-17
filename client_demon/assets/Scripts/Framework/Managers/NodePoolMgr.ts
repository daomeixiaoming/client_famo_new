import { ResMgr } from "./ResMgr";
import { ResMgrAsync } from "./ResMgrAsync";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NodePoolMgr extends cc.Component {
    public static Instance: NodePoolMgr = null!;

    private nodePools: Object = null!; // 节点池名字---》 NodePool

    protected onLoad(): void {
        if (NodePoolMgr.Instance !== null) {
            this.destroy();
            return;
        }

        NodePoolMgr.Instance = this;
    }

    public Init(): void {
        this.nodePools = {};
    }

    public async AddNodePool(bundleName: string, assetPath: string, count: number = 0) {
        var poolName = bundleName + ":" + assetPath;
        if (this.nodePools[poolName]) {
            return;
        }

        var assetPrefab = await ResMgrAsync.Instance.IE_GetAsset(bundleName, assetPath, cc.Prefab);
        if (assetPrefab === null) {
            cc.warn(poolName + "can not find!");
            return;
        }

        var nodePool = new cc.NodePool(poolName);
        this.nodePools[poolName] = nodePool;

        if (count <= 0) {
            return;
        }

        for (var i = 0; i < count; i++) {
            var item = cc.instantiate(assetPrefab as cc.Prefab);
            nodePool.put(item);
        }
    }

    /**
     * 
     * @param bundleName 
     * @param assetPath 
     * @param node 
     * @returns 
     */
    PutNodeInPool(bundleName: string, assetPath: string, node: Node): void {
        var poolName = bundleName + ":" + assetPath;
        if (!this.nodePools[poolName]) {
            return;
        }

        var nodePool = this.nodePools[poolName];
        nodePool.put(node);
    }

    GetNodeInPool(bundleName: string, assetPath: string) {
        var poolName = bundleName + ":" + assetPath;
        if (!this.nodePools[poolName]) {
            return null;
        }

        var nodePool = this.nodePools[poolName];
        var item = nodePool.get();

        if (!item) {
            var assetPrefab = ResMgr.Instance.getAsset(bundleName, assetPath, cc.Prefab);
            if (assetPrefab === null) {
                cc.warn(poolName + "can not find!");
                return null;
            }
            item = cc.instantiate(assetPrefab as cc.Prefab)
        }

        return item;
    }

    public DebugNodePoolInfo(bundleName: string, assetPath: string): void {
        var poolName = bundleName + ":" + assetPath;
        if (!this.nodePools[poolName]) {
            return null;
        }

        var nodePool: cc.NodePool = this.nodePools[poolName];
        console.log(poolName + "Node Pool has Object num " + nodePool.size());
    }

    ClearAllNodeInPool(bundleName: string, assetPath: string): void {
        var poolName = bundleName + ":" + assetPath;
        if (!this.nodePools[poolName]) {
            return null;
        }

        var nodePool: cc.NodePool = this.nodePools[poolName];
        if (nodePool) {
            nodePool.clear();
        }
    }
}
