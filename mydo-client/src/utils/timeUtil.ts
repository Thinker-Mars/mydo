import dayjs from "dayjs"

/**
 * 获取时间的毫秒数
 * @param time 
 */
export const getMilliseconds = (time: string) => {
	return dayjs(time).valueOf();
}

/**
 * 获取月份中的天数
 * @param time 
 */
export const getDaysInMonth = (time: string) => {
	return dayjs(time).daysInMonth();
}