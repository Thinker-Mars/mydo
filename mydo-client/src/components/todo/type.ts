import type { TodoType } from '@/utils/db/po/type';

export type TodoProps = {
	/**
	 * 待办事项的内容
	 */
	value?: TodoType[];
	/**
	 * 修改待办事项后的回调
	 */
	onChange?: (value: TodoType[]) => void;
}

export type SortableItemProps = {
	/**
	 * 待办项的位置
	 */
	position: number;
	/**
	 * 待办项的内容
	 */
	value: TodoType;
	/**
	 * 删除待办事项的回调
	 * @param deletePosition 被删除项的位置
	 */
	handleRemove: (deletePosition: number) => void;
	/**
	 * 修改待办项的回调
	 * @param changePosition 被修改项的位置
	 * @param newValue 新的内容
	 */
	handleChange: (changePosition: number, newTodo: TodoType) => void;
}

export type SortableContainerProps = {
	/**
	 * 待办事项的内容
	 */
	value: TodoType[];
	/**
	 * 删除待办事项的回调
	 * @param deletePosition 被删除项的位置
	 */
	handleRemove: (deletePosition: number) => void;
	/**
	 * 修改待办事项的回调
	 * @param changePosition 被修改项的位置
	 * @param newTodo 新的内容
	 */
	handleChange: (changePosition: number, newTodo: TodoType) => void;
	/**
	 * 新增待办事项的回调
	 */
	handleAdd: () => void;
}

