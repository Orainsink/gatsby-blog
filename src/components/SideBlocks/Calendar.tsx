import React, { useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Row, Select } from 'antd';
import Calendar from './CustomCalendar';
import useWindowSize from '../../useHooks/useWindowSize';
import classnames from 'classnames';
import dayjs from 'dayjs';
import styles from '../../styles/SideBar.module.less';

interface Props {
  posts: PostItem[];
}
const CalendarBlock: React.FC<Props> = ({ posts }) => {
  const dispatch = useDispatch();
  const [width] = useWindowSize();

  const secondFlex = useMemo(() => {
    if (width > 1110) return '0 0 300px';
    if (width <= 1110 && width > 600) return '1 1 800px';
    return '1 1 300px';
  }, [width]);

  const allMonths = useMemo(() => {
    const obj = {};
    posts.forEach(({ node: post }) => {
      let date = post.frontmatter.date.substring(0, 7);
      if (obj[date]) {
        obj[date] += 1;
      } else {
        obj[date] = 1;
      }
    });
    return obj;
  }, [posts]);

  const disableDate = useCallback(
    (currentDate: dayjs.Dayjs) => {
      return !allMonths[dayjs(currentDate).format('YYYY/MM')];
    },
    [allMonths]
  );

  const monthCellRender = useCallback(
    (currentDate: dayjs.Dayjs) => {
      if (allMonths[dayjs(currentDate).format('YYYY/MM')]) {
        const count = allMonths[dayjs(currentDate).format('YYYY/MM')];
        return (
          <div className={styles.calendarCell}>
            <div>{dayjs(currentDate).format('M月')}</div>
            <div className={styles.count}>{count + ' 篇'}</div>
          </div>
        );
      } else {
        return (
          <div className={styles.calendarCell}>
            <div>{dayjs(currentDate).format('M月')}</div>
            <div style={{ height: '28px' }}></div>
          </div>
        );
      }
    },
    [allMonths]
  );

  const headerRender = useCallback(({ value, onChange }) => {
    const year = value.year();
    const options = [];

    for (let i = 2018; i < dayjs().year() + 1; i += 1) {
      options.push(
        <Select.Option key={i} value={i}>
          {i}
        </Select.Option>
      );
    }

    return (
      <Row className={styles.calendar} justify="space-between">
        <Col className={styles.header}>更新月历</Col>
        <Col>
          <Select
            size="small"
            dropdownMatchSelectWidth={false}
            className={styles.select}
            onChange={(newYear) => {
              const now = value.clone().year(newYear);
              onChange(now);
            }}
            value={String(year)}
          >
            {options}
          </Select>
        </Col>
      </Row>
    );
  }, []);

  return (
    <Col
      flex={secondFlex}
      className={classnames(styles.col, styles.calendarWrap)}
    >
      <div className={styles.title}>Calendar</div>
      <Calendar
        fullscreen={false}
        mode="year"
        headerRender={headerRender}
        onChange={(date) =>
          dispatch({
            type: 'CUR_DATE',
            payload: dayjs(date).format('YYYY/MM'),
          })
        }
        disabledDate={disableDate}
        monthFullCellRender={monthCellRender}
      />
    </Col>
  );
};
export default React.memo(CalendarBlock);
