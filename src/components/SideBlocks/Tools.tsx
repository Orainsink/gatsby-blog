import React from 'react';
import { Col } from 'antd';
import classnames from 'classnames';
import styles from '../../styles/SideBar.module.less';
import tools from '../../assets/js/tools';
import Icon from '@ant-design/icons';
import useColFlex from './useColFlex';

/* Tools url */
const Tools = () => {
  const colFlex = useColFlex();

  return (
    <Col flex={colFlex} className={classnames(styles.col, styles.toolsWrapper)}>
      <div className={styles.title}>Tools</div>
      {tools.map((tool) => (
        <a
          href={tool.url}
          target="_blank"
          rel="noreferrer"
          title={tool.url}
          key={tool.name}
          className={styles.toolLink}
        >
          <span className={styles.tool}>
            <div className={styles.iconBox}>
              <Icon component={tool.icon} className={styles.toolIcon}></Icon>
            </div>
            <span className={styles.toolName}>{tool.name}</span>
          </span>
        </a>
      ))}
    </Col>
  );
};
export default React.memo(Tools);
