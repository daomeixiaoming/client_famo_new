/**
 * Random 工具类
 */
export default class RandomUtils {

    /**
     * 随机生成一个字符串
     * @param len  长度
     * @returns 
     */
    public static RandomStr(len: number): string {
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';

        var maxPos = $chars.length;
        var str = '';
        for (var i = 0; i < len; i++) {
            str += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return str;
    }

    /**
     * 随机生成一个数字字符串
     * @param len  长度
     * @returns 
     */
    public static RandomIntStr(len: number): string {
        var $chars = '0123456789';

        var maxPos = $chars.length;
        var str = '';
        for (var i = 0; i < len; i++) {
            str += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return str;
    }


    /**
     * 数组随机打乱
     * @param arrayData 
     */
    public static RandomArray(arrayData: any[]): void {
        arrayData.sort((lhs, rhs) => {
            let value = Math.random();
            if (value < 0.5) {
                return -1
            }
            return 1;
        });
    }

    /**
     * 随机在区间取一个值，包含最大，最小
     * @param min 最小值 包含
     * @param max 最大值 包含
     * @returns 
     */
    public static getRandomInt(min: number, max: number) {
        var r = Math.random();
        var rr = r * (max - min + 1) + min;
        return Math.floor(rr);
    }

    /**
     * 随机从数组中取出一个元素
     * @param arr 
     * @returns 
     */
    public static getRandomElement<T>(arr: T[]): T | undefined {
        if (arr.length === 0) return undefined;
        const index = Math.floor(Math.random() * arr.length);
        return arr[index];
    }
}
