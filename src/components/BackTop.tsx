import { ReactElement } from 'react';
import { BackTop as AntBackTop } from 'antd';

export const BackTop = (): ReactElement => (
  <AntBackTop target={() => document.body} />
);
