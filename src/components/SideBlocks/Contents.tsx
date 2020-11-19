import React, { useRef, useMemo } from 'react';
import { Col } from 'antd';
import classnames from 'classnames';
import useScrollY from '../../hooks/useScrollY';
import styles from '../../styles/SideBar.module.less';
import { Anchor } from 'antd';
import isClient from '../../utils/isClient';
const { Link } = Anchor;

interface Props {
  content: any;
}

/** 侧边栏 目录块 */
const Contents = (props: Props) => {
  const { content } = props;
  const contentsRef = useRef(null);
  const scrollY = useScrollY();

  const isFixed = useMemo(() => scrollY > 333, [scrollY]);

  const isHide = useMemo(() => {
    if (!isClient) return false;
    return (
      scrollY > document.body.scrollHeight - document.body.clientHeight - 400
    );
  }, [scrollY]);

  /**
   * Recursion Links
   */
  const renderLinks = useMemo(() => {
    if (!content.items) return null;

    function renderLink(items) {
      return items.map((item) => (
        <Link href={item.url} title={item.title} key={item.url}>
          {item.items ? renderLink(item.items) : null}
        </Link>
      ));
    }
    return renderLink(content.items);
  }, [content]);

  return (
    <Col
      flex="0 0 300px"
      className={classnames(styles.col, styles.contentsWrap, {
        [styles.contentsFix]: isFixed,
        [styles.hide]: isHide,
      })}
    >
      <div className={styles.title}>Contents</div>
      <div ref={contentsRef} className={classnames(styles.contents)}>
        <Anchor
          // ban animate. animate cause page blink.
          // getContainer={() => document.body as HTMLElement}
          targetOffset={200}
        >
          {renderLinks}
        </Anchor>
      </div>
    </Col>
  );
};
export default React.memo(Contents);
