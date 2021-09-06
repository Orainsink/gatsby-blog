import { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generateCalendar from 'antd/es/calendar/generateCalendar';
import 'antd/es/calendar/style';

/**
 * Custom Calendar component
 * replace momentjs with dayjs
 *  */
const Calendar = generateCalendar<Dayjs>(dayjsGenerateConfig);

export default Calendar;
