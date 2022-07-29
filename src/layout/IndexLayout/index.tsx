import { useEffect, ReactNode, ReactElement } from 'react';
import classnames from 'classnames';

import { SideBar } from '../../components/SideBlocks/SideBar';
import { Info } from '../../components/SideBlocks/Info';
import { TagsBlock } from '../../components/SideBlocks/TagsBlock';
import { Tools } from '../../components/SideBlocks/Tools';
import * as styles from './index.module.less';
import { useBackgroundColor } from '../../hooks';
import { Comment } from '../../components/Comment';
import { Footer } from '../../components/Footer';
import { Bg } from '../../components/Bg';
import {
  selector,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import {
  filterAtom,
  hasArrowAtom,
  sceneAtom,
  skipAtom,
  triggerAtom,
} from '../../store/atom';

interface Props {
  children: ReactNode;
}

const wrapperClassSelector = selector({
  key: 'wrapperClass',
  get: ({ get }) => {
    const scene = get(sceneAtom);
    const trigger = get(triggerAtom);
    const skip = get(skipAtom);

    return !scene || skip
      ? styles.disActive
      : trigger
      ? styles.trigger
      : styles.active;
  },
});

/**index Layout */
export const Layout = ({ children }: Props): ReactElement => {
  const wrapperClass = useRecoilValue(wrapperClassSelector);
  const scene = useRecoilValue(sceneAtom);
  const trigger = useRecoilValue(triggerAtom);
  const skip = useRecoilValue(skipAtom);
  const setHasArrow = useSetRecoilState(hasArrowAtom);
  const resetFilter = useResetRecoilState(filterAtom);
  useBackgroundColor(skip);

  useEffect(() => {
    setHasArrow(true);
    resetFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classnames(styles.wrapper, wrapperClass)} id="markdownBody">
      {scene && !skip && (
        <div
          className={classnames(styles.clickTip, trigger ? styles.show : null)}
        >
          Click to slide
        </div>
      )}
      <Bg />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.mainWrap}>
            {children}
            <Comment />
          </div>
          <SideBar>
            <Info />
            <TagsBlock />
            <Tools />
          </SideBar>
        </div>
      </main>
      <Footer />
    </div>
  );
};
