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
import styles from '../../styles/Algolia.module.less';

const HitCount = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults && searchResults.nbHits;
  return hitCount > 0 ? (
    <div className={styles.HitCount}>
      {hitCount} result{hitCount !== 1 ? `s` : ``}
    </div>
  ) : null;
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
const SearchResult = ({ indices }) => (
  <div className={styles.resultWrap}>
    {indices.map((index) => (
      <HitsInIndex index={index} key={index.name} />
    ))}
    <PoweredBy />
  </div>
);
export default SearchResult;
