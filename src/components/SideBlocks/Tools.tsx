import { ComponentType, memo, SVGProps, ReactElement } from 'react';
import { Col } from 'antd';
import classnames from 'classnames';

import * as styles from './index.module.less';
import TOOLS from '../../assets/constants/tools';
import Icon from '@ant-design/icons';
import useColFlex from './useColFlex';
interface ToolItemProp {
  data: {
    name: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    url: string;
  };
}

const ToolItem = memo(
  ({ data: { url, icon, name } }: ToolItemProp): ReactElement => (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      title={url}
      key={name}
      className={styles.toolLink}
    >
      <span className={styles.tool}>
        <div className={styles.iconBox}>
          <Icon component={icon} className={styles.toolIcon}></Icon>
        </div>
        <span className={styles.toolName}>{name}</span>
      </span>
    </a>
  )
);

/* Tools url */
const Tools = () => {
  const colFlex = useColFlex();

  return (
    <Col flex={colFlex} className={classnames(styles.col, styles.toolsWrapper)}>
      <div className={styles.title}>Tools</div>
      {TOOLS.map((tool) => (
        <ToolItem data={tool} key={tool.name} />
      ))}
    </Col>
  );
};
export default memo(Tools);
