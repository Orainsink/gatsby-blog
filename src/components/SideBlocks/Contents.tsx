import { memo, useMemo, useCallback, MouseEvent, ReactElement } from 'react';
import { Col } from 'antd';
import classnames from 'classnames';

import { useScrollY } from '../../hooks';
import * as styles from './index.module.less';
import isClient from '../../utils/isClient';
import Anchor from '../Anchor';
interface Props {
  contents: any;
}

/** 侧边栏 目录块 */
const Contents = (props: Props): ReactElement | null => {
  const { contents } = props;
  const scrollY = useScrollY();

  const isFixed = useMemo(() => scrollY > 327, [scrollY]);

  const isHide = useMemo(() => {
    if (!isClient) return false;
    return (
      scrollY > document.body.scrollHeight - document.body.clientHeight - 400
    );
  }, [scrollY]);

  const handleClick = useCallback((e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
  }, []);

  if (!contents.items) return null;

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
          onClick={handleClick}
          contents={contents}
        />
      </div>
    </Col>
  );
};
export default memo(Contents);
