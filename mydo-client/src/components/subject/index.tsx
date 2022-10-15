import { useState, useImperativeHandle, forwardRef } from 'react';
import { Form, Dialog, Textarea } from 'tdesign-react';
import { Todo, TodoSelect } from '@/components';
import { updateTodoLocal } from '@/api/local';
import { Header, SubjectMaxLength } from './constants';
import type { SubjectProps, SubjectInstance } from './type';
import type { TodoType } from '@/utils/db/po/type';
import styles from './index.less';

const { FormItem } = Form;

/**
 * 编辑主题的组件
 */
const Subject = forwardRef((props: SubjectProps, ref) => {
	const [visible, setVisible] = useState<boolean>(false);
	const [header, setHeader] = useState<string>(Header.Add);
	const [form] = Form.useForm();

	useImperativeHandle(ref, (): SubjectInstance => {
		return {
			addSubject: () => {
				setVisible(true);
			},
			modifySubject: (subjectId: number) => {
				setHeader(Header.Modify);
			}
		}
	});

	const handleCancel = () => {
		setVisible(false);
	}

	/**
	 * 更新todo
	 * @param todos 
	 * @returns 更新后todo的id
	 */
	const updateTodos = async(todos: TodoType[]) => {
		const filterTodos = todos.map(({ id, content }) => {
			const filterTodo: TodoType = { content };
			if (id) {
				filterTodo.id = id;
			}
			return filterTodo;
		});
		const resultKey = await updateTodoLocal(filterTodos);
		return resultKey;
	}

	/**
	 * 更新todo的id
	 * @param todos 
	 * @param keys 
	 */
	const mergeTodosKey = (todos: TodoType[], keys: number[]) => {
		todos.forEach((todo, index) => {
			todo.id = keys[index];
		});
	}

	const handleSubmit = async (formResult: Record<string, any>) => {
		const { subjectName, subjectTodo } = formResult;
		const todosKey = await updateTodos(subjectTodo);
		mergeTodosKey(subjectTodo, todosKey);
	}

	const handleConfirm = () => {
		if (form && form.validate) {
			form.validate().then((result) => {
				// 目前先不走db，保存在本地，后续接入登录后，再走db
				if (typeof result === 'boolean') {
					const formResult = (form!.getFieldsValue as Function)(true);
					handleSubmit(formResult);
				}
			})
		}
	}

	return (
		<Dialog
			destroyOnClose
			closeOnOverlayClick={false}
			visible={visible}
			header={header}
			onClose={handleCancel}
			onCancel={handleCancel}
			onConfirm={handleConfirm}
			className={styles.subjectDialog}
		>
			<Form
				form={form}
			>
				<FormItem
					label="主题名称"
					name="subjectName"
					rules={[
						{ required: true, message: '请输入主题名称', type: 'error' }
					]}
				>
					<Textarea placeholder="" maxLength={SubjectMaxLength} autosize />
				</FormItem>
				<FormItem
					label="关联内容"
					name="parent"
				>
					<TodoSelect />
				</FormItem>
				<FormItem
					label="待办事项"
					name="subjectTodo"
					initialData={[{
						id: undefined,
						content: ''
					}]}
				>
					<Todo />
				</FormItem>
			</Form>
		</Dialog>
	);
})

export { 
	Subject,
	SubjectInstance
};