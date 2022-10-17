import { memo, ReactElement } from 'react';
import { Col, Row } from 'antd';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { useMagicColor } from '../../hooks';
import { CATEGORY_MAP, MENU_NAMES } from '../../assets/constants/categories';

const DropMenu = styled.div`
  width: 200px;
  border-radius: 4px;
  text-align: center;
  padding: 0.2em;
  background: linear-gradient(135deg, #141619 0%, #c7d2db 100%);
  a {
    padding: 0.5em;
    color: #fff;
    display: inline-block;
    position: relative;
    transition: all 0.2s ease-out;
    &::after {
      background-color: rgba(255, 255, 255, 0.7);
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 0;
      height: 3px;
      border-radius: 10px;
      color: inherit;
      transition: all 0.2s ease-out;
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
      {MENU_NAMES.map((item, index) => (
        <Row align="middle" justify="space-between" key={index}>
          {item.map((category) => (
            <Col span={12} key={category}>
              <Link to={CATEGORY_MAP.get(category)!.path}>
                {CATEGORY_MAP.get(category)!.name}
              </Link>
            </Col>
          ))}
        </Row>
      ))}
    </DropMenu>
  );
});
