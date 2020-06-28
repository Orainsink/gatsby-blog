import React, { useRef, useMemo, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { random } from 'lodash';
import { useDispatch } from 'react-redux';
import styles from '../styles/WordCloud.module.less';
const WordCloud =
  typeof window !== 'undefined' ? require('wordCloud') : undefined;

interface IWordCloud {
  allMarkdownRemark: {
    group: {
      tag: string;
    }[];
  };
}

const WordCloudItem: React.FC = () => {
  const data: IWordCloud = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        group(field: frontmatter___tags) {
          tag: fieldValue
        }
      }
    }
  `);
  const group = data.allMarkdownRemark.group;
  const wordRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const allTags: any[] = useMemo(() => {
    const obj = {};
    group.forEach((item) => {
      obj[item.tag] = true;
    });
    return Object.keys(obj).map((key) => [key, random(16, 32, false)]);
  }, [group]);

  useEffect(() => {
    if (wordRef.current) {
      WordCloud(wordRef.current, {
        list: allTags,
        gridSize: 18,
        shape: 'square',
        shrinkToFit: true,
        drawOutOfBound: false,
        ellipticity: 1.5,
        backgroundColor: 'transparent',
        fontFamily: 'Yahei',
        color: 'random-dark',
        click: (item) => {
          dispatch({ type: 'SEARCH', payload: `#${item[0]}` });
        },
      });
    }
  }, [allTags, dispatch]);

  return (
    <div style={{ width: '100%', padding: '24px 0' }} className={styles.wrap}>
      <div
        ref={wordRef}
        style={{ width: '100%', height: '100px', boxSizing: 'border-box' }}
      />
    </div>
  );
};

export default React.memo(WordCloudItem);
