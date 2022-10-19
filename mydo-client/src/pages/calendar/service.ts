import { getSubjectInRangeLocal, getTodoInRangeLocal } from '@/api/local';
import { getMilliseconds, getDaysInMonth } from '@/utils';

const getSubjectInRangeTime = async (month: number, year: number) => {
	const beginDay = `${year}-${month}-01`;
	const days = getDaysInMonth(beginDay);
	const endDay = `${year}-${month}-${days} 23:59:59`;
	const beginDayMillseconds = getMilliseconds(beginDay);
	const endDayMillseconds = getMilliseconds(endDay);
	const rangeSubject = await getSubjectInRangeLocal(beginDayMillseconds, endDayMillseconds);
	return rangeSubject;
}

const getTodoId = (subjectList: SubjectType[]) => {
	const ids = subjectList.reduce((acc, cur) => {
		if (cur.todoList) {
			acc.push(...cur.todoList);
		}
		return acc;
	}, [] as number[]);
	const idCollection = {} as any;
	ids.forEach((id) => {
		if (!idCollection[id]) {
			idCollection.id = id;
		}
	});
	// id从小到大排序
	return Object.values(ids).sort((previous, after) => {
		return previous - after;
	});
}

const getTodo = async (subjectList: SubjectType[]) => {
	const todoIdList = getTodoId(subjectList);
	const todo = await getTodoInRangeLocal(todoIdList[0], todoIdList[todoIdList.length - 1]);
	return todo;
}

export const getSubject = async (month: number, year: number) => {
	const subjectList = await getSubjectInRangeTime(month, year);
	if (subjectList.length > 0) {
		const todoList = await getTodo(subjectList);
	}
	return [];
}