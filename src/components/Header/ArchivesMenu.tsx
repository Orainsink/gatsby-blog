import React, { useRef } from 'react';
import { Col, Row } from 'antd';
import { Link } from 'gatsby';

import { useMagicColor } from '../../hooks';
import * as styles from './index.module.less';
import { CATEGORY_MAP, MENU_NAMES } from '../../assets/constants/categories';

const ArchivesMenu = React.memo(({ visible }: { visible: boolean }) => {
  const magicRef = useRef<HTMLDivElement>(null);
  useMagicColor(magicRef.current, visible);

  return (
    <div className={styles.dropMenu} ref={magicRef}>
      {MENU_NAMES.map((item, index) => (
        <Row align="middle" justify="space-between" key={index}>
          {item.map((category) => (
            <Col span={12} key={category}>
              <Link to={CATEGORY_MAP.get(category).path}>
                {CATEGORY_MAP.get(category).name}
              </Link>
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
});

export default React.memo(ArchivesMenu);
