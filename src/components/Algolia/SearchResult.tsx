import { Link } from 'gatsby';
import { ReactElement } from 'react';
import {
  connectStateResults,
  Highlight,
  Hits,
  Snippet,
} from 'react-instantsearch-dom';
import { Divider } from 'antd';

import * as styles from './index.module.less';
import { generatePath } from '../../utils/generatePath';

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

const HitCount = connectStateResults(({ searchResults }: HitCountProps) => {
  const hitCount = searchResults && searchResults.nbHits;

  return (
    <Divider orientation="center">
      {hitCount} result{hitCount > 1 ? `s` : ``}
    </Divider>
  );
});

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

export const SearchResult = (): ReactElement => {
  return (
    <div className={styles.resultWrap}>
      <HitCount />
      {/* @ts-ignore */}
      <Hits className={styles.Hits} hitComponent={PageHit} />
    </div>
  );
};
