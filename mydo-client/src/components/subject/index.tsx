import { useState, useImperativeHandle, forwardRef } from 'react';
import { Form, Dialog, Input } from 'tdesign-react';
import { Todo, TodoSelect } from '@/components';
import { Header } from './constants';
import type { SubjectProps, SubjectInstance } from './type';
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

	const handleConfirm = () => {
		if (form && form.validate) { 
			form.validate().then((result) => {
				if (typeof result === 'boolean') {
					// TODO 提交主题
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
					<Input placeholder="" clearable />
				</FormItem>
				<FormItem
					label="关联内容"
					name="parentTodo"
				>
					<TodoSelect />
				</FormItem>
				<FormItem
					label="待办事项"
					name="subjectTodo"
					initialData={['']}
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