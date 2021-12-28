import React, { memo } from 'react';
import { Col, Row } from 'antd';
import { useHasMounted } from '../../hooks';
import Calendar from './Calendar';
import Contents from './Contents';
import Info from './Info';
import TagsBlock from './TagsBlock';
import Tools from './Tools';

interface Props {
  children: React.ReactNode;
}
/**侧边栏 */
const SideBar = (props: Props) => {
  const { children } = props;

  const sideWrap = {
    padding: 0,
  };

  const hasMounted = useHasMounted();

  return (
    hasMounted && (
      <Col flex="1 1 300px" style={sideWrap}>
        <Row align="top" justify="center">
          {children}
        </Row>
      </Col>
    )
  );
};

SideBar.Calendar = Calendar;
SideBar.Contents = Contents;
SideBar.Info = Info;
SideBar.TagsBlock = TagsBlock;
SideBar.Tools = Tools;

export default SideBar;
