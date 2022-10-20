import { updateRecord, TableList, getRecordInRange, getLogger } from '@/utils';

/**
 * 新建/更新主题
 * @param subject
 */
export const updateLocalSubject = async (subject: SubjectType) => {
	await updateRecord(TableList.Subject, [subject], 'id');
	return;
}

/**
 * 查询指定时间范围内的主题
 * @param min 最小日期（ms）
 * @param max 最大日期（ms）
 */
export const getLocalSubjectInRange = async (min: number, max: number) => {
	return getRecordInRange(TableList.Subject, min, max, 'createTime').then(
		(subject) => {
			return subject as SubjectType[];
		},
		(reason) => {
			getLogger().error(`getSubjectInRangeLocal error: ${reason}`);
			return [];
		}
	)
}

/**
 * 查询指定范围内的todo
 * @param min 最小的todo的id
 * @param max 最大的todo的id
 */
export const getLocalTodoInRange = async (min: number, max: number) => {
	return getRecordInRange(TableList.Todo, min, max, 'id').then(
		(todo) => {
			return todo as TodoType[];
		},
		(reason) => {
			getLogger().error(`getTodoInRangeLocal error: ${reason}`);
			return [];
		}
	)
}