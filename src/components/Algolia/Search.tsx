import algoliasearch from 'algoliasearch/lite';
import React, { useState, useRef, useEffect } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import SearchBox from './SearchBox';
import SearchResult from './SearchResult';
import styles from '../../styles/Algolia.module.less';
import { useMaxHeight } from '../../hooks';
import { useSelector } from 'react-redux';
import { ReactComponent as SearchSvg } from '../../assets/img/search.svg';

const Search = () => {
  const rootRef = useRef();
  const [query, setQuery] = useState<any>();
  const maxHeight = useSelector((state) => state.maxHeight);
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
  const indices = [{ name: `Pages`, title: `Pages` }];

  return (
    <div ref={rootRef}>
      {!!client && (
        <InstantSearch
          searchClient={client}
          indexName={indices[0].name}
          onSearchStateChange={({ query }) => setQuery(query)}
        >
          <SearchBox />
          {query && query.length > 0 ? (
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
export default React.memo(Search);
