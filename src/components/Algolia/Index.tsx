import algoliasearch from 'algoliasearch/lite';
import React, { useState, useRef } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import useClickOutside from '../../useHooks/useClickOutside';

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
        <div onFocus={() => setFocus(true)} />
        {/* <StyledSearchResult
            show={query && query.length > 0 && hasFocus}
            indices={indices}
          /> */}
      </InstantSearch>
    </div>
  );
}
