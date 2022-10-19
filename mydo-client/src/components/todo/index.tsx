import { useState } from 'react';
import { Textarea } from 'tdesign-react';
import { IconFont } from 'tdesign-icons-react';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import { MaxTodoCount, DialogClassName, MaxLength } from './constants';
import type { TodoProps, SortableItemProps, SortableContainerProps } from './type';
import styles from './index.less';


const DragHandle: any = SortableHandle(() => {
	return (
		<IconFont
			name="move"
			size="2em"
			style={{ cursor: 'row-resize' }}
		/>
	)
});

const SortableItem: any = SortableElement(
	({
		position,
		value,
		handleChange,
		handleRemove
	}: SortableItemProps
	) => {
		return (
    <div className={styles.sortableItem}>
      <div className={styles.inputWrap}>
				<DragHandle />
				<Textarea
					autosize
					value={value.content}
					placeholder=""
					onChange={(newContent) => {
						handleChange(position, { ...value, content: newContent });
					}}
					maxlength={MaxLength}
				/>
			</div>
			<IconFont
				name="delete"
				size="2em"
				onClick={() => {
					handleRemove(position);
				}}
			/>
    </div>
  );
});

const Container: any = SortableContainer(
	({
		value,
		handleChange,
		handleRemove,
		handleAdd
	}: SortableContainerProps
	) => {
		return (
			<div className={styles.todo}>
				{value.map((singleValue, index) => {
					return (
						<div key={index} className={styles.sortableItemWrap}>
							<SortableItem
								index={index}
								position={index}
								value={singleValue}
								handleChange={handleChange}
								handleRemove={handleRemove}
							/>
						</div>
					)
				})}
				{value.length < MaxTodoCount && (
					<IconFont
						name="add-circle"
						size="2em"
						onClick={() => {
							handleAdd();
						}}
					/>
				)}
			</div>
	)
});

/**
 * 编辑待办事项的组件
 */
const Todo = (props: TodoProps) => {
	const { value = [], onChange } = props;
	const [dragIndex, setDragIndex] = useState(-1);

	const updateBeforeSortStart = ({ index }: { index: number }) => {
    setDragIndex(index);
	};
	
	const handleSort = (oldIndex: number, newIndex: number) => {
    if (oldIndex !== newIndex) {
			const pendingValue = arrayMoveImmutable(value, oldIndex, newIndex);
			if (onChange) {
				onChange(pendingValue);
			}
    }
	};

	const handleSortStart = () => {
		const matchDialog = document.getElementsByClassName(DialogClassName);
		if (matchDialog) {
			const subjectDialog = matchDialog[0] as HTMLElement
			subjectDialog.style.cursor = 'row-resize';
		}
	}

	const resetCursor = () => {
		const matchDialog = document.getElementsByClassName(DialogClassName);
		if (matchDialog) {
			const subjectDialog = matchDialog[0] as HTMLElement
			subjectDialog.style.cursor = 'default';
		}
	}
	
	const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) => {
    setDragIndex(-1);
		handleSort(oldIndex, newIndex);
		resetCursor();
  };

	const handleChange = (changePosition: number, newTodo: TodoType) => {
		const pendingValue = [...value];
		pendingValue[changePosition] = newTodo;
		if (onChange) {
			onChange(pendingValue);
		}
	}

	const handleRemove = (deletePosition: number) => {
		const pendingValue = value.filter((memorizedValue, index) => index !== deletePosition);
		if (onChange) {
			onChange(pendingValue);
		}
	}

	const handleAdd = () => {
		const pendingValue = [...value, { id: undefined, content: '' }];
		if (onChange) {
			onChange(pendingValue);
		}
	}

	return (
		<Container
			useDragHandle
			value={value}
			dragIndex={dragIndex}
			updateBeforeSortStart={updateBeforeSortStart}
			onSortStart={handleSortStart}
			onSortEnd={onSortEnd}
			handleChange={handleChange}
			handleRemove={handleRemove}
			handleAdd={handleAdd}
		/>
	)
};

export { 
	Todo
}