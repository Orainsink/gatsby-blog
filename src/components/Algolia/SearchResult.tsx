import { Link } from 'gatsby';
import { memo, ReactElement } from 'react';
import {
  connectStateResults,
  Highlight,
  Hits,
  Index,
  Snippet,
  PoweredBy,
} from 'react-instantsearch-dom';
import { Divider } from 'antd';
import { useSelector } from 'react-redux';

import * as styles from './index.module.less';
import generatePath from '../../utils/generatePath';
import { ReactComponent as NoResultSvg } from '../../assets/img/noResult.svg';
import { iRootState } from '../../redux/store';
import { SearchIndex } from './typings';

interface Props {
  indices: SearchIndex[];
}

interface HitProp {
  hit: {
    categories: string;
    slug: string;
    objectId: string;
  };
}

interface HitCountProps {
  searchResults: {
    nbHits: number;
  };
}

const HitCount: () => ReactElement = connectStateResults(
  ({ searchResults }: HitCountProps) => {
    const hitCount = searchResults && searchResults.nbHits;
    const maxHeight = useSelector((state: iRootState) => state.maxHeight);

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
  }
);

const PageHit = ({ hit }: HitProp): ReactElement => (
  <div>
    <Link to={generatePath(hit.categories, hit.slug)}>
      <h4>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </h4>
    </Link>
    <Snippet attribute="excerpt" hit={hit} tagName="mark" />
  </div>
);

const HitsInIndex = ({ index }: { index: SearchIndex }): ReactElement => (
  <Index indexName={index.name}>
    <HitCount />
    <Hits className={styles.Hits} hitComponent={PageHit} />
  </Index>
);

const SearchResult = ({ indices }: Props): ReactElement => {
  return (
    <div className={styles.resultWrap}>
      {indices.length > 0 &&
        indices.map((index) => <HitsInIndex index={index} key={index.name} />)}
      <PoweredBy />
    </div>
  );
};
export default memo(SearchResult);
