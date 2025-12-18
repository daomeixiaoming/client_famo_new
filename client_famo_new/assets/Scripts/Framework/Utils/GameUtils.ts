import { UICfg } from "../../Game/Config/GameConfig";
import { ResMgrAsync } from "../Managers/ResMgrAsync";
import UIMgr from "../Managers/UIMgr";

/**
 * cocos 工具类
 */
export default class GameUtils {

    // 格式化时间
    /**
     * 
     * @param time 时间戳
     * 返回格式 2022.01.25 14:56
     */
    public static formatTime(time: number) {
        let res = "";
        let data = new Date(time);

        let temp = data.toLocaleDateString();
        let arr = temp.split("/");
        let year = arr[0];
        let month = (arr[1].length === 1) ? `0${arr[1]}` : arr[1];
        let day = (arr[2].length === 1) ? `0${arr[1]}` : arr[2];
        let h = data.getHours();
        let m = data.getMinutes();

        res = `${year}:${month}:${day} ${h}:${m}`;
        return res;
    }

    /**
     * 示例：计算两个时间戳的秒数差
     * @param timestamp1 
     * @param timestamp2 
     * @returns 
     */
    public static getSecondsBetweenTimestamps(timestamp1: number, timestamp2: number): number {
        const diffInMilliseconds = Math.abs(timestamp2 - timestamp1); // 确保差值为正数
        return Math.floor(diffInMilliseconds / 1000); // 转换为秒
    }


    /**
     * 将一维数组转成指定维数的二维数组
     * @param oneDimArray 一维数组
     * @param chunkSize 指定维数
     * @returns 
     */
    public static convertTo2DArray<T>(oneDimArray: T[], chunkSize: number): T[][] {
        const result: T[][] = [];
        for (let i = 0; i < oneDimArray.length; i += chunkSize) {
            result.push(oneDimArray.slice(i, i + chunkSize));
        }
        return result;
    }

    /**
     * 深拷贝
     * @param target 
     * @param map 
     * @returns 
     */
    public static DeepClone<T>(target: T, map = new WeakMap<any, any>()): T {
        // 处理原始类型、null 和函数（函数通常直接返回，因为通常不需要复制）
        if (target === null || typeof target !== 'object') {
            return target;
        }

        // 检查 WeakMap 中是否存在当前对象的克隆，处理循环引用
        if (map.has(target)) {
            return map.get(target);
        }

        // 处理 Date 对象
        if (target instanceof Date) {
            return new Date(target.getTime()) as T;
        }

        // 处理 RegExp 对象
        if (target instanceof RegExp) {
            return new RegExp(target.source, target.flags) as T;
        }

        // 处理 Map 对象
        if (target instanceof Map) {
            const cloneMap = new Map();
            map.set(target, cloneMap);
            target.forEach((value, key) => {
                cloneMap.set(this.DeepClone(key, map), this.DeepClone(value, map)); // 递归克隆 key 和 value
            });
            return cloneMap as T;
        }

        // 处理 Set 对象
        if (target instanceof Set) {
            const cloneSet = new Set();
            map.set(target, cloneSet);
            target.forEach(value => {
                cloneSet.add(this.DeepClone(value, map)); // 递归克隆 value
            });
            return cloneSet as T;
        }

        // 处理数组和普通对象
        const cloneObj: any = Array.isArray(target) ? [] : {};
        map.set(target, cloneObj);

        // 使用 Reflect.ownKeys 获取所有自身属性（包括不可枚举和 Symbol）
        const keys = Reflect.ownKeys(target);
        for (const key of keys) {
            // 递归克隆每个属性值
            cloneObj[key] = this.DeepClone((target as any)[key], map);
        }

        return cloneObj;
    }

    /**
     *  使用异步图集修改图片
     * @param abName 
     * @param atalsName 
     * @param path 
     * @param spName 
     */
    public static SetSpData(abName: string, atalsName: string, path: string, spName: cc.Sprite) {
        ResMgrAsync.Instance.IE_GetAsset(abName, atalsName, cc.SpriteAtlas).then((res: cc.SpriteAtlas) => {
            if (res && spName) {
                let sf = res.getSpriteFrame(path);
                if (sf) {
                    spName.spriteFrame = sf;
                }
            }
        })
    }
}
