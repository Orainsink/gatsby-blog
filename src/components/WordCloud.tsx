import React, { useRef, useMemo, useEffect } from 'react';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import random from 'lodash/random';
import { useDispatch } from 'react-redux';
import styles from '../styles/WordCloud.module.less';
const WordCloud =
  typeof window !== 'undefined' ? require('wordcloud') : undefined;

interface Data {
  allMarkdownRemark: {
    group: {
      tag: string;
    }[];
  };
}

interface Props {
  jump?: boolean;
  height?: number;
}

const WordCloudItem: React.FC<Props> = (props) => {
  const data: Data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        group(field: frontmatter___tags) {
          tag: fieldValue
        }
      }
    }
  `);
  const { jump = false, height = 150 } = props;
  const group = data.allMarkdownRemark.group;
  const wordRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const allTags: any[] = useMemo(() => {
    const obj = {};
    group.forEach((item) => {
      obj[item.tag] = true;
    });
    return Object.keys(obj).map((key) => [key, random(14, 32, false)]);
  }, [group]);

  useEffect(() => {
    if (wordRef.current) {
      WordCloud(wordRef.current, {
        list: allTags,
        gridSize: 16,
        shape: 'square',
        shrinkToFit: true,
        weightFactor: 1,
        drawOutOfBound: false,
        rotateRatio: 0,
        ellipticity: 1.5,
        backgroundColor: 'transparent',
        fontFamily: 'Lato,sans-serif',
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
