import styled from 'styled-components';

export const Container = styled.section`
  li {
    list-style-type: decimal;
    list-style-position: outside;
  }
  blockquote {
    padding: var(--space-md);
    color: var(--color-text-secondary);
    border-left: 4px solid var(--color-border);
    background: var(--color-text-fourth);
    line-height: 2;
    border-radius: var(--border-radius-sm);
    margin: 0 0 var(--space-md);
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 0.67em 0;
    padding: 0;
    font-weight: var(--font-weight-xl);
    text-rendering: optimizeLegibility;
    line-height: 1.1;
    color: var(--color-mdx-header);
  }
  h2 {
    a {
      transform: translateY(4px);
    }
    svg {
      fill: var(--color-mdx-header);
    }
    &::before {
      padding-left: var(--space-sm);
      border-left: var(--space-xxs) solid var(--color-border);
      content: '';
      border-radius: var(--border-radius-sm);
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
  margin-bottom: var(--space-md);
  position: relative;
  z-index: auto;
  border-left: 4px solid var(--color-border);
  border-radius: var(--border-radius-sm);

  &::after {
    position: absolute;
    content: '目录';
    top: -20px;
    right: 10%;
    font-size: 42px;
    color: var(--color-text-fourth);
    font-weight: var(--font-weight-xl);
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
    margin: 0 0 0 var(--space-md);
  }
  li {
    margin: 0;
    list-style: decimal;
  }
`;

export const License = styled.a`
  vertical-align: -3px;
  margin-left: var(--space-md);
`;

export const LeadUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: var(--space-md);
  font-size: var(--space-md);
  font-weight: var(--font-weight-lg);
  margin: 0;

  ${({ theme }) => theme.media.isMobile} {
    padding: var(--space-md) 0;
    li {
      width: 100%;
      padding: 8px;
    }
  }
`;

export const Article = styled.article`
  padding: var(--space-lg) 0.7rem;
  border-bottom: 1px solid var(--color-border);
  transition: background-color 0.3s ease-in;

  h1 {
    color: var(--color-mdx-header);
  }

  ${({ theme }) => theme.media.isMobile} {
    padding: 1.5rem 0;
  }
`;

export const PostHr = styled.hr`
  margin-bottom: var(--space-lg);
  background: none;
`;

export const MajorTitle = styled.h1`
  text-align: center;
  font-weight: var(--font-weight-xl);
`;
export const Subtitle = styled.div`
  margin-bottom: var(--space-lg);
  color: var(--color-text-secondary);
  text-align: center;

  a {
    color: inherit;
    text-decoration: underline;
  }
`;
