import { updateRecord, TableList } from '@/utils';


/**
 * 新建/更新todo
 * @param todo todo的内容
 */
export const updateTodoLocal = async (todo: TodoType[]) => {
	const result = await updateRecord(TableList.Todo, todo, 'id');
	return result;
}