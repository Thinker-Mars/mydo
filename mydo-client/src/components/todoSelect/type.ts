export type TodoSelectProps = {
	/**
	 * 关联待办事项的值
	 */
	value?: string;
	/**
	 * 修改关联待办事项后的回调
	 */
	onChange?: (value: string) => void;
}