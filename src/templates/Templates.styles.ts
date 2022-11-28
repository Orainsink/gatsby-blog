import styled from 'styled-components';

export const Container = styled.section`
  counter-reset: chapter;

  li {
    list-style-type: decimal;
    list-style-position: outside;
  }
  blockquote {
    padding: 1em;
    color: var(--color-text-secondary);
    border-left: 4px solid var(--color-border);
    background: var(--color-text-fourth);
    line-height: 2;
    border-radius: var(--border-radius);
    margin: 0 0 var(--space-md);
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 0.67em 0;
    padding: 0;
    font-weight: 700;
    text-rendering: optimizeLegibility;
    line-height: 1.1;
    color: var(--color-mdx-header);
  }
  h2 {
    &::before {
      counter-increment: chapter;
      content: counter(chapter) '. ';
    }
  }

  // anchor offset
  ${({ theme }) => theme.media.isNotMobile} {
    *[id] {
      padding-top: 90px;
      margin-top: -70px;
    }
    & .anchor.before {
      top: 70px;
    }
  }
`;

export const TableContents = styled.div`
  background: transparent;
  margin-bottom: 1em;
  position: relative;
  z-index: auto;
  border-left: 4px solid var(--color-border);
  border-radius: var(--border-radius);

  &::after {
    position: absolute;
    content: '目录';
    top: -20px;
    right: 10%;
    font-size: 42px;
    color: var(--color-text-fourth);
    font-weight: 700;
    z-index: 0;
  }
  * {
    z-index: 1;
    position: relative;
  }
  p {
    margin: 0;
  }
  ul {
    margin: 0 0 0 1em;
  }
  li {
    margin: 0;
    list-style: decimal;
  }
`;

export const License = styled.a`
  vertical-align: -3px;
  margin-left: 1em;
`;

export const LeadUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 1em;
  font-size: 16px;
  font-weight: bold;
  margin: 0;

  ${({ theme }) => theme.media.isMobile} {
    padding: 1em 0;
    li {
      width: 100%;
      padding: 8px;
    }
  }
`;

export const Article = styled.article`
  padding: 1.5rem 0.7rem;
  border-bottom: 1px solid var(--color-border);
  transition: background-color 0.2s ease-in;

  h1 {
    color: var(--color-mdx-header);
  }

  ${({ theme }) => theme.media.isMobile} {
    padding: 1.5rem 0;
  }
`;
