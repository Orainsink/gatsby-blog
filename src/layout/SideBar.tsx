import React from 'react';
import { Col, Row } from 'antd';

interface ISideBar {
  children: any;
}
/**侧边栏 */
const SideBar: React.FC<ISideBar> = (props) => {
  const { children } = props;

  const sideWrap = {
    padding: 0,
  };

  return (
    <Col flex="1 1 300px" style={sideWrap}>
      <Row align="top" justify="center">
        {children}
      </Row>
    </Col>
  );
};
export default React.memo(SideBar);
