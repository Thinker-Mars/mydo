import { Calendar } from 'tdesign-react';

/**
 * 主题日历
 */
const SubjectCalendar = () => {
	return (
		<Calendar
			controllerConfig={{
				mode: {
					visible: false
				},
				weekend: {
					visible: false
				}
			}}
			preventCellContextmenu
		/>
	)
}

export default SubjectCalendar;