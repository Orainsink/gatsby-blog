import React from 'react';
import { Col, Row } from 'antd';
import useHasMounted from '../../hooks/useHasMounted';

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
export default React.memo(SideBar);
