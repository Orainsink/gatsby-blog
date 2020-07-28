import React, { useRef, useMemo, useEffect } from 'react';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import { random } from 'lodash';
import { useDispatch } from 'react-redux';
import styles from '../styles/WordCloud.module.less';
const WordCloud =
  typeof window !== 'undefined' ? require('wordcloud') : undefined;

interface IWordCloud {
  allMarkdownRemark: {
    group: {
      tag: string;
    }[];
  };
}

interface IWordCloudItem {
  jump?: boolean;
}

const WordCloudItem: React.FC<IWordCloudItem> = (props) => {
  const data: IWordCloud = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        group(field: frontmatter___tags) {
          tag: fieldValue
        }
      }
    }
  `);
  const { jump = false } = props;
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
        shape: 'pentagon',
        shrinkToFit: true,
        drawOutOfBound: false,
        ellipticity: 1,
        backgroundColor: 'transparent',
        fontFamily: 'PingFang SC, Yahei,Tahoma,Arial,SimSun,Verdana',
        color: 'random-dark',
        click: (item) => {
          dispatch({ type: 'SEARCH', payload: `#${item[0]}` });
          jump && navigate('/archives/');
        },
      });
    }
  }, [allTags, jump, dispatch]);

  return (
    <div className={styles.wrap}>
      <div
        ref={wordRef}
        style={{ width: '100%', height: '150px', boxSizing: 'border-box' }}
      />
    </div>
  );
};

export default React.memo(WordCloudItem);
