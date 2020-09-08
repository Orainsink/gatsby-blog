import { Link } from 'gatsby';
import React from 'react';
import {
  connectStateResults,
  Highlight,
  Hits,
  Index,
  Snippet,
  PoweredBy,
} from 'react-instantsearch-dom';
import { Divider } from 'antd';
import styles from '../../styles/Algolia.module.less';
import { graphql, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import { useSelector } from 'react-redux';

const HitCount = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults && searchResults.nbHits;
  const data = useStaticQuery(graphql`
    query shasha2Query {
      sharkNoResult: file(absolutePath: { regex: "/noResult.jpg/" }) {
        childImageSharp {
          fixed(width: 235, height: 206) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);
  const { sharkNoResult } = data;
  const maxHeight = useSelector((state) => state.maxHeight);

  return hitCount > 0 ? (
    <Divider orientation="center">
      {hitCount} result{hitCount !== 1 ? `s` : ``}
    </Divider>
  ) : (
    <div
      className={styles.shashaWrap}
      style={{ top: `${maxHeight / 2 - 118}px` }}
    >
      <Image fixed={sharkNoResult.childImageSharp.fixed} alt="" />
      <div className={styles.noResultText}>Whe, where's the results?</div>
    </div>
  );
});

const PageHit = ({ hit }) => (
  <div>
    <Link to={hit.slug}>
      <h4>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </h4>
    </Link>
    <Snippet attribute="excerpt" hit={hit} tagName="mark" />
  </div>
);

const HitsInIndex = ({ index }) => (
  <Index indexName={index.name}>
    <HitCount />
    <Hits className={styles.Hits} hitComponent={PageHit} />
  </Index>
);

interface Props {
  indices: any[];
}

const SearchResult: React.FC<Props> = ({ indices }) => {
  return (
    <div className={styles.resultWrap}>
      {indices.length > 0 &&
        indices.map((index) => <HitsInIndex index={index} key={index.name} />)}
      <PoweredBy />
    </div>
  );
};
export default React.memo(SearchResult);
