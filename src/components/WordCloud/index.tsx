import React, { useRef, useMemo, useCallback, useEffect } from 'react';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import { useDispatch, useSelector } from 'react-redux';
import * as styles from './index.module.less';
import isClient from '../../utils/isClient';
import { iRootState } from '../../redux/store';
const WordCloud = isClient ? require('wordcloud') : undefined;

interface Data {
  allFile: {
    group: {
      fieldValue: string;
      totalCount: number;
    }[];
  };
}

interface Props {
  jump?: boolean;
  height?: number;
}
/**
 * word cloud
 * @prop [jump] either can jump to "/archives", default false
 * @prop [height] div height, default 150
 */
const WordCloudItem = (props: Props) => {
  const data: Data = useStaticQuery(graphql`
    query {
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
  const wordRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const theme = useSelector((state: iRootState) => state.theme);

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

  useEffect(() => {
    if (wordRef.current) {
      WordCloud(wordRef.current, {
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
        color: theme === 'dark' ? 'random-light' : 'random-dark',
        click: (item) => {
          dispatch({ type: 'CUR_TAG', payload: item[0] });
          jump && navigate('/archives/');
        },
      });
    }
  }, [allTags, jump, dispatch, theme]);

  return (
    <div className={styles.wrap}>
      <div ref={wordRef} style={{ width: '100%', height: `${height}px` }} />
    </div>
  );
};

export default React.memo(WordCloudItem);
