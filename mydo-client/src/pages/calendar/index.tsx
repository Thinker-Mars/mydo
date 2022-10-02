import { useRef } from 'react';
import dayjs from 'dayjs';
import { Calendar, Swiper } from 'tdesign-react';
import type { CalendarCell } from 'tdesign-react';
import { Subject } from '@/components';
import type { SubjectInstance } from '@/components';
import styles from './index.less';

const { SwiperItem } = Swiper;

/**
 * 主题日历
 */
const SubjectCalendar = () => {
	const subjectInstance = useRef<SubjectInstance>(null);

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
					if (subjectInstance && subjectInstance.current) { 
							subjectInstance.current.addSubject();
					}
				}}
				// cell={renderCell}
				className={styles.subjectCalendar}
			/>
			<Subject ref={subjectInstance} />
		</>
	)
}

export default SubjectCalendar;