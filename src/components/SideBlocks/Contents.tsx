import React, { useMemo, useCallback } from 'react';
import { Anchor, Col } from 'antd';
import classnames from 'classnames';

import { useScrollY } from '../../hooks';
import * as styles from './index.module.less';
import isClient from '../../utils/isClient';
interface Props {
  content: any;
}

/** 侧边栏 目录块 */
const Contents = (props: Props) => {
  const { content } = props;
  const scrollY = useScrollY();

  const isFixed = useMemo(() => scrollY > 327, [scrollY]);

  const isHide = useMemo(() => {
    if (!isClient) return false;
    return (
      scrollY > document.body.scrollHeight - document.body.clientHeight - 400
    );
  }, [scrollY]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
  }, []);

  /**
   * Recursion Links
   */
  const renderLinks = useMemo(() => {
    if (!content.items) return null;

    function renderLink(items) {
      return items.map((item) => (
        <Anchor.Link href={item.url} title={item.title} key={item.url}>
          {item.items ? renderLink(item.items) : null}
        </Anchor.Link>
      ));
    }
    return renderLink(content.items);
  }, [content]);

  if (!content.items) return null;

  return (
    <Col
      flex="0 0 300px"
      className={classnames(styles.col, styles.contentsWrap, {
        [styles.contentsFix]: isFixed,
        [styles.hide]: isHide,
      })}
    >
      <div className={styles.title}>Contents</div>
      <div className={classnames(styles.contents)}>
        <Anchor
          getContainer={() => document.body as HTMLElement}
          targetOffset={80}
          onClick={handleClick}
        >
          {renderLinks}
        </Anchor>
      </div>
    </Col>
  );
};
export default React.memo(Contents);
