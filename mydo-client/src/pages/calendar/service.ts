import { getLocalSubjectInRange, getLocalTodoInRange } from '@/api/local';
import { getMilliseconds, getDaysInMonth } from '@/utils';

const getSubjectInRangeTime = async (month: number, year: number) => {
	const beginDay = `${year}-${month}-01`;
	const days = getDaysInMonth(beginDay);
	const endDay = `${year}-${month}-${days} 23:59:59`;
	const beginDayMillseconds = getMilliseconds(beginDay);
	const endDayMillseconds = getMilliseconds(endDay);
	const rangeSubject = await getLocalSubjectInRange(beginDayMillseconds, endDayMillseconds);
	return rangeSubject;
}

/**
 * 获取主题下所有todo的id
 * @param subjectList 主题列表
 */
const getTodoId = (subjectList: SubjectType[]) => {
	const ids = subjectList.reduce((acc, cur) => {
		if (cur.todoIdList) {
			acc.push(...cur.todoIdList);
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

/**
 * 获取主题下的所有todo
 * @param subjectList 主题列表
 */
const getTodo = async (subjectList: SubjectType[]) => {
	const todoIdList = getTodoId(subjectList);
	const min = Math.max(0, todoIdList[0] - 1);
	const max = todoIdList[todoIdList.length - 1] + 1;
	const todo = await getLocalTodoInRange(min, max);
	return todo;
}

/**
 * 将todo的内容合并到主题中
 * @param subjectList 主题列表
 * @param todoList todo列表
 */
const mergeTodoInSubject = (subjectList: SubjectType[], todoList: TodoType[]): SubjectVOType[] => {
	const pendingSubjectVOList: SubjectVOType[] = [];
	for (const subject of subjectList) {
		const todoIdList = subject.todoIdList || [];
		const pendingTodoList: TodoType[] = [];
		for (const todoId of todoIdList) {
			const position = todoList.findIndex(({ id }) => id === todoId);
			/**
			 * 正常不会出现找不到对应todo的情况
			 * 但如果出现了，那么丢弃这一条todo
			 */
			if (position !== -1) {
				pendingTodoList.push({
					...todoList[position]
				})
			}
		}
		pendingSubjectVOList.push({
			id: subject.id,
			createTime: subject.createTime,
			subjectName: subject.subjectName,
			todoList: pendingTodoList,
			parentSubjectId: subject.parentSubjectId,
			parentTodoId: subject.parentTodoId
		});
	}
	return pendingSubjectVOList;
}

/**
 * 获取指定年份/月的主题
 * @param month 月
 * @param year 年
 */
export const getLocalSubject = async (month: number, year: number): Promise<SubjectVOType[]> => {
	const subjectList = await getSubjectInRangeTime(month, year);
	if (subjectList.length > 0) {
		const todoList = await getTodo(subjectList);
		const subjectVOList = mergeTodoInSubject(subjectList, todoList);
		return subjectVOList;
	}
	return [];
}