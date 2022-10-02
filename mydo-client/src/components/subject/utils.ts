/**
 * 待办事项校验器
 * 
 * 待办事项必须存在一个
 */
export const todoValidator = (value: string[]) => {
	return value.some((singleTodo) => !!singleTodo);
}