import algoliasearch from 'algoliasearch/lite';
import { memo, useState, useEffect, ReactElement } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';

import SearchBox from './SearchBox';
import SearchResult from './SearchResult';

interface Props {
  visible: boolean;
}
const Search = ({ visible }: Props): ReactElement => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    setClient(
      // @ts-ignore
      algoliasearch(
        // @ts-ignore
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
      )
    );
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
export default memo(Search);
