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
import { useSelector } from 'react-redux';
import generatePath from '../../utils/generatePath';
import { ReactComponent as NoResultSvg } from '../../assets/img/noResult.svg';

const HitCount = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults && searchResults.nbHits;
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
      <NoResultSvg />
      <div className={styles.noResultText}>Whe, where's the results?</div>
    </div>
  );
});
interface HitProp {
  hit: {
    categories: string;
    slug: string;
    objectId: string;
  };
}
const PageHit = ({ hit }: HitProp) => (
  <div>
    <Link to={generatePath(hit.categories, hit.slug)}>
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

const SearchResult = ({ indices }: Props) => {
  return (
    <div className={styles.resultWrap}>
      {indices.length > 0 &&
        indices.map((index) => <HitsInIndex index={index} key={index.name} />)}
      <PoweredBy />
    </div>
  );
};
export default React.memo(SearchResult);
