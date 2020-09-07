import algoliasearch from 'algoliasearch/lite';
import React, { useState, useRef } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import SearchBox from './SearchBox';
import SearchResult from './SearchResult';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import styles from '../../styles/Algolia.module.less';
import useMaxHeight from '../../useHooks/useMaxHeight';
import { useSelector } from 'react-redux';

const Search: React.FC = () => {
  const rootRef = useRef();
  const [query, setQuery] = useState<Iterable<any>>();
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
  useMaxHeight();

  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  );
  const indices = [{ name: `Pages`, title: `Pages` }];

  return (
    <div ref={rootRef}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indices[0].name}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <SearchBox />
        {/* @ts-ignore */}
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
    </div>
  );
};
export default React.memo(Search);
