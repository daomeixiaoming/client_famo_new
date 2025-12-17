import DebugUtils from "./DebugUtils";

export interface WeekData {
    year: number,
    week: number,
}
export default class TimeUtils {

    public static getISOWeek(date: Date): { year: number; week: number } {
        const tempDate = new Date(date.getTime());
        tempDate.setHours(0, 0, 0, 0);
        // 调整到本周的星期四
        tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));

        const yearStart = new Date(tempDate.getFullYear(), 0, 4);
        // 调整到当年第一个星期四
        yearStart.setDate(yearStart.getDate() + 3 - ((yearStart.getDay() + 6) % 7));

        const weekNumber =
            Math.round(
                (tempDate.getTime() - yearStart.getTime()) / (7 * 24 * 3600000)
            ) + 1;

        let res: WeekData = {
            year: tempDate.getFullYear(),
            week: weekNumber
        }
        return res;
    }

    /**
     * 
     * @param time 毫秒
     * return 结构2025.8.18 20:04:8
     */
    public static FormatTime(time: number): string {
        let res = "";
        let tempDate = new Date(time);   //Mon Sep 15 2025 17:56:55 GMT+0800
        let formattedDate = tempDate.toLocaleString('zh-CN'); //2025/9/15 17:56:55
        res = formattedDate.replace(/\//g, ".");    //2025.9.15 17:56:55
        DebugUtils.Log("FormatTime2 =", res);
        return res;
    }


    /**
     * 
     * @param milliseconds 毫秒
     * @returns 
     */
    public static formatMillisecondsToHMS(milliseconds: number): string {
        // 定义时间常量（毫秒）
        const MS_PER_SECOND = 1000;
        const MS_PER_MINUTE = MS_PER_SECOND * 60;
        const MS_PER_HOUR = MS_PER_MINUTE * 60;

        // 计算小时、剩余毫秒数
        const hours = Math.floor(milliseconds / MS_PER_HOUR);
        let remainingMs = milliseconds % MS_PER_HOUR;

        // 计算分钟、剩余毫秒数
        const minutes = Math.floor(remainingMs / MS_PER_MINUTE);
        remainingMs %= MS_PER_MINUTE;

        // 计算秒数
        const seconds = Math.floor(remainingMs / MS_PER_SECOND);

        // 格式化各部分为两位数，并用冒号连接
        return [
            hours.toString().padStart(2, '0'),
            minutes.toString().padStart(2, '0'),
            seconds.toString().padStart(2, '0')
        ].join(':');
    }
}

