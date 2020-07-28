import React from 'react';
import { Col, Row } from 'antd';

interface ISideBar {
  children: any;
}
/**侧边栏 */
const SideBar: React.FC<ISideBar> = (props) => {
  const { children } = props;
  return (
    <Col flex="1 1 300px">
      <Row align="top" justify="center">
        {children}
      </Row>
    </Col>
  );
};
export default React.memo(SideBar);
