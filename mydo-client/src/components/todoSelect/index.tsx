import { TreeSelect, SelectInput } from 'tdesign-react';
import type { TodoSelectProps } from './type';
import { TodoTree } from './mock';

/**
 * 选择待办事项的组件
 */
const TodoSelect = (props: TodoSelectProps) => {
	const { value, onChange } = props;

	const handleChange = (newValue: string) => {
		if (onChange) {
			onChange(newValue);
		}
	}

	return (
		<TreeSelect
			filterable
			data={TodoTree}
			value={value}
			placeholder="请搜索"
			onChange={(val) => {
				handleChange(val as string);
			}}
		/>
	)
}

export {
	TodoSelect
}