import { memo, ReactElement } from 'react';
import { Col, Row } from 'antd';
import { Link } from 'gatsby';

import { useMagicColor } from '../../hooks';
import * as styles from './index.module.less';
import { CATEGORY_MAP, MENU_NAMES } from '../../assets/constants/categories';

interface Props {
  visible: boolean;
}
const ArchivesMenu = memo(({ visible }: Props): ReactElement => {
  useMagicColor(() => document.getElementById('magic-container'), visible);

  return (
    <div className={styles.dropMenu} id="magic-container">
      {MENU_NAMES.map((item, index) => (
        <Row align="middle" justify="space-between" key={index}>
          {item.map((category) => (
            <Col span={12} key={category}>
              <Link to={CATEGORY_MAP.get(category)!.path}>
                {CATEGORY_MAP.get(category)!.name}
              </Link>
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
});

export default memo(ArchivesMenu);
