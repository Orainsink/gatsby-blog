import React, { useCallback, useRef } from 'react';
import { Col, Row } from 'antd';
import { Link } from 'gatsby';
import { useMagicColor } from '../../hooks';
import * as styles from './index.module.less';
import { categoryColumn, categories } from '../../assets/config/categories';

let column: string[][] = [];
for (let i = 0; i < categories.length; i += 2) {
  column.push(categories.slice(i, i + 2));
}

const ArchivesMenu = React.memo(({ visible }: { visible: boolean }) => {
  const magicRef = useRef<HTMLDivElement>(null);
  useMagicColor(magicRef.current, visible);

  const refCallback = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      magicRef.current = node;
    }
  }, []);

  return (
    <div className={styles.dropMenu} ref={refCallback}>
      {column.map((item, index) => (
        <Row align="middle" justify="space-between" key={index}>
          {item.map((category) => (
            <Col span={12} /* className={styles.cls} */ key={category}>
              <Link to={categoryColumn[category].path}>
                {categoryColumn[category].name}
              </Link>
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
});

export default React.memo(ArchivesMenu);
