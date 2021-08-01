import React, { useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Row, Select } from 'antd';
import Calendar from './CustomCalendar';
import classnames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import * as styles from './index.module.less';
import useColFlex from './useColFlex';

interface Props {
  posts: ChildMdxItem[];
}
const CalendarBlock = ({ posts }: Props) => {
  const dispatch = useDispatch();
  const colFlex = useColFlex();

  const allMonths: { [month: string]: number | undefined } = useMemo(() => {
    const obj = {};
    posts.forEach(({ node }) => {
      let date = node.childMdx.frontmatter.date.substring(0, 7);
      if (obj[date]) {
        obj[date] += 1;
      } else {
        obj[date] = 1;
      }
    });
    return obj;
  }, [posts]);

  const disableDate = useCallback(
    (currentDate: Dayjs) => {
      return !allMonths[dayjs(currentDate).format('YYYY/MM')];
    },
    [allMonths]
  );

  const monthCellRender = useCallback(
    (currentDate: Dayjs) => {
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

    for (let i = 2019; i < dayjs().year() + 1; i += 1) {
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
    <Col flex={colFlex} className={classnames(styles.col, styles.calendarWrap)}>
      <div className={styles.title}>Calendar</div>
      <Calendar
        fullscreen={false}
        mode="year"
        headerRender={headerRender}
        onSelect={(date) => {
          if (!allMonths[dayjs(date).format('YYYY/MM')]) return;
          dispatch({
            type: 'CUR_DATE',
            payload: dayjs(date).format('YYYY/MM'),
          });
        }}
        defaultValue={dayjs()}
        disabledDate={disableDate}
        monthFullCellRender={monthCellRender}
      />
    </Col>
  );
};
export default React.memo(CalendarBlock);
