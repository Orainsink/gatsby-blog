import { memo, ReactElement } from 'react';
import { Col, Row } from 'antd';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { useMagicColor } from '../../hooks';
import {
  fileSystemCategories,
  menuNames,
} from '../../assets/constants/categories';

const DropMenu = styled.div`
  width: 200px;
  border-radius: var(--border-radius-sm);
  text-align: center;
  padding: var(--space-xxs);
  background: linear-gradient(135deg, #141619 0%, #c7d2db 100%);
  a {
    padding: var(--space-xs);
    color: #fff !important;
    display: inline-block;
    position: relative;
    transition: all 0.3s ease-out;
    &::after {
      background-color: rgba(255, 255, 255, 0.7);
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 0;
      height: 3px;
      border-radius: var(--border-radius);
      color: inherit;
      transition: all 0.3s ease-out;
    }
    &:hover::after {
      transform: translateY(-3px);
      width: 100% !important;
    }
    &:hover {
      transform: translateY(-3px);
    }
  }
`;

interface Props {
  visible: boolean;
}
export const ArchivesMenu = memo(({ visible }: Props): ReactElement => {
  useMagicColor(() => document.getElementById('magic-container'), visible);

  return (
    <DropMenu id="magic-container">
      {menuNames.map((item) => (
        <Row align="middle" justify="space-between" key={item[0][0]}>
          {item.map((category) => (
            <Col span={12} key={category}>
              <Link
                to={
                  fileSystemCategories[
                    category as keyof typeof fileSystemCategories
                  ].path
                }
              >
                {
                  fileSystemCategories[
                    category as keyof typeof fileSystemCategories
                  ].name
                }
              </Link>
            </Col>
          ))}
        </Row>
      ))}
    </DropMenu>
  );
});
