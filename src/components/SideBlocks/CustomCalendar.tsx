import { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generateCalendar from 'antd/es/calendar/generateCalendar';
import 'antd/es/calendar/style';
import { ReactElement } from 'react';
import { CalendarProps } from 'antd';

/**
 * Custom Calendar component
 * replace momentjs with dayjs
 *  */
export const Calendar: (props: CalendarProps<Dayjs>) => ReactElement =
  generateCalendar<Dayjs>(dayjsGenerateConfig);
