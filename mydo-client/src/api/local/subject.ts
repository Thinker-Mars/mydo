import { updateRecord, TableList, getRecordInRange, getLogger } from '@/utils';
import type { SubjectType } from '@/utils/db/po/type';

/**
 * 新建/更新主题
 * @param subject
 */
export const updateSubjectLocal = async (subject: SubjectType) => {
	await updateRecord(TableList.Subject, [subject], 'id');
	return;
}

/**
 * 查询指定时间范围内的主题
 * @param min 最小日期（ms）
 * @param max 最大日期（ms）
 */
export const getSubjectInRangeLocal = async (min: number, max: number) => {
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