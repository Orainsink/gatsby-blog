import algoliasearch from 'algoliasearch/lite';
import React, { useState, useRef } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import useClickOutside from '../../useHooks/useClickOutside';
import SearchBox from './SearchBox';
import SearchResult from './SearchResult';
import styles from '../../styles/Algolia.module.less';

export default function Search({ indices }) {
  const rootRef = useRef();
  const [query, setQuery] = useState();
  const [hasFocus, setFocus] = useState(false);

  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  );
  useClickOutside(rootRef.current, () => setFocus(false));
  return (
    <div ref={rootRef}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indices[0].name}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <SearchBox onFocus={() => setFocus(true)} hasFocus={hasFocus} />

        <SearchResult
          // show={query && query.length > 0 && hasFocus}
          indices={indices}
        />
      </InstantSearch>
    </div>
  );
}
