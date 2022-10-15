import { updateRecord, TableList } from '@/utils';
import type { SubjectType } from '@/utils/db/po/type';

/**
 * 新建/更新主题
 * @param subject
 */
export const updateSubjectLocal = async (subject: SubjectType) => {
	await updateRecord(TableList.Subject, [subject], 'id');
	return;
}