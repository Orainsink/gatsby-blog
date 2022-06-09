import { memo, ReactElement } from 'react';
import { BackTop } from 'antd';

const BackTopComponent = (): ReactElement => (
  <BackTop target={() => document.body} />
);

export default memo(BackTopComponent);
