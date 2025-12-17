

// 输出
export default class DebugUtils {

    public static Log(...data: any[]) {
        if (CC_DEBUG) {
            console.log(...data);
        }
    }

    public static Error(...data: any[]) {
        if (CC_DEBUG) {
            console.error(...data);
        }
    }
}