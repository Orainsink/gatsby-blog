import React, { useRef, useMemo, useCallback, useEffect } from 'react';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import { useDispatch } from 'react-redux';
import styles from '../styles/WordCloud.module.less';
import isClient from '../utils/isClient';
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
        gridSize: 12,
        shape: 'square',
        shrinkToFit: true,
        weightFactor: 1,
        drawOutOfBound: false,
        rotateRatio: 0,
        ellipticity: 1.5,
        backgroundColor: 'transparent',
        fontFamily: 'Finger Paint, sans-serif',
        color: 'random-dark',
        click: (item) => {
          dispatch({ type: 'CUR_TAG', payload: item[0] });
          jump && navigate('/archives/');
        },
      });
    }
  }, [allTags, jump, dispatch]);

  return (
    <div className={styles.wrap}>
      <div ref={wordRef} style={{ width: '100%', height: `${height}px` }} />
    </div>
  );
};

export default React.memo(WordCloudItem);
