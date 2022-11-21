import { ReactElement } from 'react';
import { FloatButton } from 'antd';

export const BackTop = (): ReactElement => (
  <FloatButton.BackTop target={() => document.body} />
);
