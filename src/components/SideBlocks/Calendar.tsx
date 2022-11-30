import { useMemo, useCallback, ReactElement } from 'react';
import { Col, Row, Select, Calendar } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';

import { useColFlex } from './useColFlex';
import { filterAtom } from '../../store/atom';
import { BaseCol, Title } from './SideBlocks.styles';
import { FileEdge } from '../../../typings/custom';

const CalendarHeaderContainer = styled(Row)`
  padding: 8px;
`;

const Header = styled(Col)`
  font-weight: bold;
`;

const CalendarCell = styled.div`
  text-align: center;
`;

const Count = styled.div`
  font-size: var(--font-size-small);
`;

const CalendarContainer = styled(BaseCol)`
  height: unset;

  .ant-picker-cell {
    &:hover {
      background: var(--color-component-hover);
    }
    &::before {
      height: 100% !important;
    }
  }
`;

interface Props {
  posts: FileEdge[];
}
export const CalendarBlock = ({ posts }: Props): ReactElement => {
  const setFilter = useSetRecoilState(filterAtom);
  const colFlex = useColFlex();

  const allMonths: Record<string, number | undefined> = useMemo(() => {
    const obj: Record<string, number> = {};
    posts.forEach(({ node }) => {
      const frontmatter = node.childMdx.frontmatter!;
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

  const renderMonthCell = useCallback(
    (currentDate: Dayjs) => {
      if (allMonths[dayjs(currentDate).format('YYYY/MM')]) {
        const count = allMonths[dayjs(currentDate).format('YYYY/MM')];
        return (
          <CalendarCell>
            <div>{dayjs(currentDate).format('M月')}</div>
            <Count>{count + ' 篇'}</Count>
          </CalendarCell>
        );
      } else {
        return (
          <CalendarCell>
            <div>{dayjs(currentDate).format('M月')}</div>
          </CalendarCell>
        );
      }
    },
    [allMonths]
  );

  const renderHeader = useCallback(
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
        <CalendarHeaderContainer justify="space-between">
          <Header>更新月历</Header>
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
        </CalendarHeaderContainer>
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
    <CalendarContainer flex={colFlex}>
      <Title>Calendar</Title>
      <Calendar
        fullscreen={false}
        mode="year"
        headerRender={renderHeader}
        onSelect={handleSelect}
        defaultValue={dayjs()}
        disabledDate={disableDate}
        monthFullCellRender={renderMonthCell}
      />
    </CalendarContainer>
  );
};
