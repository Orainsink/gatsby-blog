import algoliasearch from 'algoliasearch/lite';
import { memo, useState, useEffect, ReactElement } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';

import SearchBox from './SearchBox';
import SearchResult from './SearchResult';
import * as styles from './index.module.less';
import { useMaxHeight } from '../../hooks';
import { useSelector } from 'react-redux';
import { ReactComponent as SearchSvg } from '../../assets/img/search.svg';
import { iRootState } from '../../redux/store';
import { SearchIndex } from './typings';

interface Props {
  visible: boolean;
}
const Search = ({ visible }: Props): ReactElement => {
  const [query, setQuery] = useState<string>('');
  const maxHeight = useSelector((state: iRootState) => state.maxHeight);
  const [client, setClient] = useState(null);
  useMaxHeight();

  useEffect(() => {
    setClient(
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
      )
    );
  }, []);
  const indices: SearchIndex[] = [{ name: `Pages`, title: `Pages` }];

  return (
    <div>
      {!!client && (
        <InstantSearch
          searchClient={client}
          indexName={indices[0].name}
          onSearchStateChange={({ query }: { query: string }) =>
            setQuery(query)
          }
        >
          {visible && <SearchBox />}
          {query.length > 0 ? (
            <SearchResult indices={indices} />
          ) : (
            <div
              className={styles.shashaWrap}
              style={{ top: `${maxHeight / 2 - 130}px` }}
            >
              <SearchSvg />
              <div className={styles.noResultText}>Input to start search</div>
            </div>
          )}
        </InstantSearch>
      )}
    </div>
  );
};
export default memo(Search);
