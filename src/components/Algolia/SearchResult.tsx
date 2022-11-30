import { Link } from 'gatsby';
import { ReactElement } from 'react';
import {
  connectStateResults,
  Highlight,
  Hits,
  Snippet,
} from 'react-instantsearch-dom';
import { Divider } from 'antd';
import styled from 'styled-components';

import { generatePath } from '../../utils/generatePath';

const ResultWrapper = styled.div`
  height: 100%;
  margin-top: 0.5em;

  ul {
    list-style: none;
    margin-left: 0;
  }

  mark {
    background-color: var(--color-component-hover);
    color: var(--highlight-color);
  }

  .ais-Hits-item {
    border-left: 4px solid var(--color-border);
    padding: 10px;
    margin-bottom: 1em;

    a {
      color: var(--color-text);
      h4 {
        margin-bottom: 0.2em;
      }
    }
    &:hover {
      background-color: var(--color-component-hover);
    }
  }

  .ais-PoweredBy {
    display: flex;
    align-content: center;
    justify-content: flex-end;
  }
  .ais-PoweredBy-link {
    margin-left: 10px;
  }
`;

interface HitProp {
  hit: {
    categories: string;
    title: string;
    objectId: string;
  };
}

interface HitCountProps {
  searchResults: {
    nbHits: number;
  };
}

const HitCount = connectStateResults(({ searchResults }: HitCountProps) => {
  const hitCount = searchResults?.nbHits;

  return (
    <Divider orientation="center">
      {hitCount} result{hitCount > 1 ? `s` : ``}
    </Divider>
  );
});

const PageHit = ({ hit }: HitProp): ReactElement => (
  <Link to={generatePath(hit.categories, hit.title)}>
    <div>
      <h4>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </h4>
      <Snippet attribute="excerpt" hit={hit} tagName="mark" />
    </div>
  </Link>
);

export const SearchResult = (): ReactElement => {
  return (
    <ResultWrapper>
      <HitCount />
      <Hits hitComponent={PageHit} />
    </ResultWrapper>
  );
};
