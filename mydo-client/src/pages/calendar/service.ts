import { getSubjectInRangeLocal } from '@/api/local';
import { getMilliseconds, getDaysInMonth } from '@/utils';

export const getSubjectInRangeTime = async (month: number, year: number) => {
	const beginDay = `${year}-${month}-01`;
	const days = getDaysInMonth(beginDay);
	const endDay = `${year}-${month}-${days} 23:59:59`;
	const beginDayMillseconds = getMilliseconds(beginDay);
	const endDayMillseconds = getMilliseconds(endDay);
	const rangeSubject = await getSubjectInRangeLocal(beginDayMillseconds, endDayMillseconds);
}