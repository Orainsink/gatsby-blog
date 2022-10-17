import { memo, useMemo, useCallback, ReactElement } from 'react';
import { useStaticQuery, graphql, navigate } from 'gatsby';

import * as styles from './WordCloud.module.less';
import { isClient } from '../../utils/isClient';
import { useIsDark } from '../../hooks';
import { GetWordCloudDataQuery } from '../../../graphql-types';
import { DeepRequiredAndNonNullable } from '../../../typings/custom';
import { useSetRecoilState } from 'recoil';
import { filterAtom } from '../../store/atom';
const WordCloudCons = isClient ? require('wordcloud') : undefined;

interface Props {
  jump?: boolean;
  height?: number;
}
/**
 * word cloud
 * @prop [jump] either can jump to "/archives", default false
 * @prop [height] div height, default 150
 */
export const WordCloud = memo((props: Props): ReactElement => {
  const data = useStaticQuery<
    DeepRequiredAndNonNullable<GetWordCloudDataQuery>
  >(graphql`
    query getWordCloudData {
      allFile(filter: { sourceInstanceName: { eq: "tech" } }) {
        group(field: childMdx___frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `);
  const { jump = false, height = 150 } = props;
  const group = data.allFile.group;
  const isDark = useIsDark();
  const setFilter = useSetRecoilState(filterAtom);

  const weighted = useMemo(() => {
    let arr = group.map((item) => item.totalCount);
    return {
      max: Math.max(...arr),
      min: Math.min(...arr),
    };
  }, [group]);

  const getFontSize = useCallback(
    (count: number) => {
      const { max, min } = weighted;
      return 16 + (16 * (count - min)) / (max - min);
    },
    [weighted]
  );

  const allTags: [string, number][] = useMemo(() => {
    return group.map((item) => [item.fieldValue, getFontSize(item.totalCount)]);
  }, [group, getFontSize]);

  const wordRefCb = useCallback(
    (node: HTMLDivElement) => {
      if (node) {
        WordCloudCons(node, {
          list: allTags,
          gridSize: 18,
          shape: 'square',
          shrinkToFit: true,
          weightFactor: 1,
          drawOutOfBound: false,
          rotateRatio: 0,
          ellipticity: 1.5,
          classes: styles.cloud,
          backgroundColor: 'transparent',
          fontFamily: 'Finger Paint, sans-serif',
          color: isDark ? 'random-light' : 'random-dark',
          click: (item: string[]) => {
            setFilter((state) => ({ ...state, curTag: item[0] }));
            jump && navigate('/archives/');
          },
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allTags, jump, isDark]
  );

  return (
    <div className={styles.wrap}>
      <div ref={wordRefCb} style={{ width: '100%', height: `${height}px` }} />
    </div>
  );
});
