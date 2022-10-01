import { useState } from 'react';
import { Calendar, Dialog, Form, Input, Swiper } from 'tdesign-react';
import dayjs from 'dayjs';
import type { CalendarCell } from 'tdesign-react';
import styles from './index.less';

const { FormItem } = Form;

const { SwiperItem } = Swiper;

/**
 * 主题日历
 */
const SubjectCalendar = () => {
	const [visible, setVisible] = useState<boolean>(false);
	const [form] = Form.useForm();

	const renderCell = (cellData: CalendarCell) => {
		return (
			<>
				{cellData.formattedDate && (
					<div className={styles.calendarCell}>
						{dayjs(cellData.formattedDate).date()}
					</div>
				)}
				<Swiper type="card" autoplay={false} style={{ width: '100%' }}>
						<SwiperItem><div style={{ backgroundColor: 'red' }}>hahahahh</div></SwiperItem>
						<SwiperItem><div style={{ backgroundColor: 'blue' }}>12344</div></SwiperItem>
						<SwiperItem><div style={{ backgroundColor: 'green' }}>343434343</div></SwiperItem>
				</Swiper>
			</>
		)
	}

	return (
		<>
			<Calendar
				controllerConfig={{
					current: {
						visible: false
					},
					mode: {
						visible: false
					},
					weekend: {
						visible: false
					}
				}}
				// preventCellContextmenu
				onCellDoubleClick={() => {
					setVisible(true);
				}}
				// cell={renderCell}
				className={styles.subjectCalendar}
			/>
			<Dialog
				visible={visible}
				header="新建主题"
				onCancel={() => {
					setVisible(false);
				}}
				onConfirm={() => {
					setVisible(false);
				}}
			>
				<Form
					form={form}
				>
					<FormItem label="主题名称" name="subjectName">
						<Input />
					</FormItem>
				</Form>
			</Dialog>
		</>
	)
}

export default SubjectCalendar;