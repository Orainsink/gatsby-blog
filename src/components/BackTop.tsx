import { memo } from 'react';
import { BackTop } from 'antd';

const BackTopComponent = () => <BackTop target={() => document.body} />;

export default memo(BackTopComponent);
