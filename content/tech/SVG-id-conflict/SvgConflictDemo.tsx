import React from 'react';
import { ReactComponent as AllSvg } from './all.svg';
import { Button, Tooltip } from 'antd';
const ToolTipComponent = React.memo(() => (
  <Tooltip title={<AllSvg />} destroyTooltipOnHide>
    <Button>悬浮</Button>
  </Tooltip>
));
const SVGConflictDemo = () => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <ToolTipComponent />
    再移开后
    <AllSvg />
    的渐变色会失效
  </div>
);
export default React.memo(SVGConflictDemo);
