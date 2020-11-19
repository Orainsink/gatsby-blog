import algoliasearch from 'algoliasearch/lite';
import React, { useState, useRef, useEffect } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import SearchBox from './SearchBox';
import SearchResult from './SearchResult';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import styles from '../../styles/Algolia.module.less';
import useMaxHeight from '../../hooks/useMaxHeight';
import { useSelector } from 'react-redux';

const Search = () => {
  const rootRef = useRef();
  const [query, setQuery] = useState<any>();
  const data = useStaticQuery(graphql`
    query shashaQuery {
      sharkSearch: file(absolutePath: { regex: "/search.jpg/" }) {
        childImageSharp {
          fixed(width: 265, height: 227) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);
  const { sharkSearch } = data;
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
              <Image fixed={sharkSearch.childImageSharp.fixed} alt="" />
              <div className={styles.noResultText}>Input to start search</div>
            </div>
          )}
        </InstantSearch>
      )}
    </div>
  );
};
export default React.memo(Search);
