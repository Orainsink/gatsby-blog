import algoliasearch, { SearchClient } from 'algoliasearch/lite';
import { useState, useEffect, ReactElement } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';

import { SearchBox } from './SearchBox';
import { SearchResult } from './SearchResult';

interface Props {
  visible: boolean;
}
export const Search = ({ visible }: Props): ReactElement => {
  const [client, setClient] = useState<SearchClient>();

  useEffect(() => {
    const algoliaAppId = process.env.GATSBY_ALGOLIA_APP_ID;
    const algoliaSearchKey = process.env.GATSBY_ALGOLIA_SEARCH_KEY;

    if (algoliaAppId && algoliaSearchKey) {
      setClient(algoliasearch(algoliaAppId, algoliaSearchKey));
    }
  }, []);

  return (
    <div>
      {!!client && (
        <InstantSearch searchClient={client} indexName="Pages">
          {visible && <SearchBox />}
          <SearchResult />
        </InstantSearch>
      )}
    </div>
  );
};
