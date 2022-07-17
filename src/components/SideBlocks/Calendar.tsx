import { memo, useMemo, useCallback, ReactElement } from 'react';
import { Col, Row, Select } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import classnames from 'classnames';

import Calendar from './CustomCalendar';
import * as styles from './index.module.less';
import useColFlex from './useColFlex';
import { FileEdge } from '../../../graphql-types';
import { useSetRecoilState } from 'recoil';
import { filterAtom } from '../../store/atom';

interface Props {
  posts: FileEdge[];
}
const CalendarBlock = ({ posts }: Props): ReactElement => {
  const setFilter = useSetRecoilState(filterAtom);
  const colFlex = useColFlex();

  const allMonths: Record<string, number | undefined> = useMemo(() => {
    const obj: Record<string, number> = {};
    posts.forEach(({ node }) => {
      const frontmatter = node!.childMdx!.frontmatter!;
      let date = frontmatter.date.substring(0, 7);
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

  const headerRender = useCallback(
    ({
      value,
      onChange,
    }: {
      value: Dayjs;
      onChange: (value: Dayjs) => void;
    }) => {
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
                const now = value.clone().year(parseInt(newYear));
                onChange(now);
              }}
              value={String(year)}
            >
              {options}
            </Select>
          </Col>
        </Row>
      );
    },
    []
  );

  const handleSelect = useCallback(
    (date: Dayjs) => {
      if (!allMonths[dayjs(date).format('YYYY/MM')]) return;
      setFilter((state) => ({
        ...state,
        curDate: dayjs(date).format('YYYY/MM'),
      }));
    },
    [allMonths, setFilter]
  );

  return (
    <Col flex={colFlex} className={classnames(styles.col, styles.calendarWrap)}>
      <div className={styles.title}>Calendar</div>
      <Calendar
        fullscreen={false}
        mode="year"
        headerRender={headerRender}
        onSelect={handleSelect}
        defaultValue={dayjs()}
        disabledDate={disableDate}
        monthFullCellRender={monthCellRender}
      />
    </Col>
  );
};
export default memo(CalendarBlock);
