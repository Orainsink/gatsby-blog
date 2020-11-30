import React from 'react';
import { Col } from 'antd';
import classnames from 'classnames';
import useMedia from '../../hooks/useMedia';
import styles from '../../styles/SideBar.module.less';
import tools from '../../assets/js/tools';
import Icon from '@ant-design/icons';

/* Tools url */
const Tools = () => {
  const is1110 = useMedia('(max-width: 1110px)');

  return (
    <Col
      flex={is1110 ? '1 1 300px' : '0 0 300px'}
      className={classnames(styles.col, styles.toolsWrapper)}
    >
      <div className={styles.title}>Tools</div>
      {tools.map((tool) => (
        <a
          href={tool.url}
          target="_blank"
          rel="noreferrer"
          title={tool.url}
          key={tool.name}
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
