import { Divider, Table, TableProps } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import styled from 'styled-components';

export const PageDivider = styled(Divider)`
  font-size: var(--space-lg) !important;
  font-weight: var(--font-weight-lg);
  color: #2b2b2b;
`;

export const ReloadIcon = styled(ReloadOutlined)`
  margin-left: var(--space-md);
  transition: all 0.5s ease-in-out;
  font-size: var(--space-md);
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
