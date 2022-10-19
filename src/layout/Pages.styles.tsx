import { Divider, Table, TableProps } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import styled from 'styled-components';

export const PageDivider = styled(Divider)`
  font-size: 24px !important;
  font-weight: bold;
  color: #2b2b2b;
`;

export const ReloadIcon = styled(ReloadOutlined)`
  margin-left: 1em;
  transition: all 0.5s ease-in-out;
  font-size: 16px;
  &:hover {
    transform: rotate(360deg);
  }
`;

const StyledTable = styled(Table)`
  cursor: pointer;
`;

export const WrappedTable = ({ className, ...rest }: TableProps<any>) => (
  <StyledTable rowClassName={className} {...rest} />
);
