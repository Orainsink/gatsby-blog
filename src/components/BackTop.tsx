import React from 'react';
import { BackTop } from 'antd';

const BackTopComponent: React.FC = () => {
  return <BackTop target={() => document.body} />;
};

export default BackTopComponent;
