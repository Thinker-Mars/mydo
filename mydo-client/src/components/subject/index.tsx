import { useState, useImperativeHandle, forwardRef } from 'react';
import dayjs from 'dayjs';
import { Form, Dialog, Textarea, MessagePlugin } from 'tdesign-react';
import { Todo, TodoSelect } from '@/components';
import { updateTodoLocal, updateSubjectLocal } from '@/api/local';
import { Header, SubjectMaxLength } from './constants';
import { haveLogin } from '@/utils';
import type { SubjectProps, SubjectInstance } from './type';
import type { TodoType, SubjectType } from '@/utils/db/po/type';
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
	 * 将主题信息保存至本地
	 * @param formResult 
	 */
	const handleLocalSubmit = async (formResult: Record<string, any>) => {
		const { subjectId ,subjectName, subjectTodo } = formResult;
		const todosKey = await updateTodos(subjectTodo);
		const subject: SubjectType = {
			subjectName,
			todoList: todosKey,
			createTime: dayjs().valueOf()
		}
		if (subjectId) {
			subject.id = subjectId;
		}
		await updateSubjectLocal(subject);
		MessagePlugin.success('操作成功', 1500);
		setVisible(false);
	}

	const handleConfirm = () => {
		if (form && form.validate) {
			form.validate().then((result) => {
				// 目前先不走db，保存在本地，后续接入登录后，再走db
				if (typeof result === 'boolean') {
					const formResult = (form!.getFieldsValue as Function)(true);
					if (!haveLogin()) {
						handleLocalSubmit(formResult);
					}
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
					<Textarea autosize placeholder="" maxlength={SubjectMaxLength} />
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