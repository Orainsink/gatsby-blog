import React, { useMemo, useCallback } from 'react';
import { Col, Row, Select } from 'antd';
import Calendar from './CustomCalendar';
import classnames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import * as styles from './index.module.less';
import useColFlex from './useColFlex';
import { graphql, useStaticQuery } from 'gatsby';
interface Data {
  file: {
    childMdx: {
      rawBody: string;
    };
  };
}

type Result = Record<string, 'green' | 'red'>;
const MarketCalendarBlock = () => {
  const data: Data = useStaticQuery(graphql`
    {
      file(absolutePath: { regex: "/癌股实战经验长期总结.mdx/" }) {
        childMdx {
          rawBody
        }
      }
    }
  `);
  const colFlex = useColFlex();
  const rawBody = data.file.childMdx.rawBody;
  const allMonthsData = useMemo(() => {
    const reg = /###\s20\d\d.\d\d.\d\d\s[\u4e00-\u9fa5]*\s[🟩|🟥]/g;
    const result: Result = {};
    rawBody.match(reg).forEach((str: string) => {
      const date = str.slice(4, 14);
      console.log('🟩'.codePointAt(1), str);
      const color = str.includes('\u{1F7E5}') ? 'green' : 'red';
      result[date] = color;
    });
    return result;
  }, []);

  const colorObj = {
    green: '#00b100',
    red: '#d42111',
  };

  const dateFullCellRender = useCallback(
    (currentDate: Dayjs) => {
      if (allMonthsData[dayjs(currentDate).format('YYYY.MM.DD')]) {
        const color = allMonthsData[dayjs(currentDate).format('YYYY.MM.DD')];
        return (
          <div
            className={styles.calendarCell}
            style={{ background: colorObj[color] }}
          >
            <div>{dayjs(currentDate).format('D')}</div>
          </div>
        );
      } else {
        return (
          <div className={styles.calendarCell}>
            <div>{dayjs(currentDate).format('D')}</div>
          </div>
        );
      }
    },
    [allMonthsData]
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
        <Col className={styles.header}>挨打日历</Col>
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
        mode="month"
        headerRender={headerRender}
        onSelect={() => {}}
        defaultValue={dayjs()}
        dateFullCellRender={dateFullCellRender}
      />
    </Col>
  );
};
export default React.memo(MarketCalendarBlock);
