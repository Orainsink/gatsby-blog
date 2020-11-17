import React, { useCallback } from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../layout/BlogLayout';
import SEO from '../components/seo';
import Tags from '../components/Tags';
import useWindowSize from '../hooks/useWindowSize';
import styles from '../styles/Blog.module.less';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { Anchor } from 'antd';
import Comment from '../components/SideBlocks/Comment';
import CodeBlock from '../components/CodeBlock';

interface Props {
  data: {
    mdx: MdxItem;
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
  pageContext: {
    previous: any;
    next: any;
    id: string;
  };
}
const SnippetPostTemplate = ({ data: { mdx }, pageContext }: Props) => {
  const {
    frontmatter: { title, tags, description, date, categories },
    excerpt,
    tableOfContents,
  } = mdx;
  const { previous, next } = pageContext;
  const [width] = useWindowSize();

  /**
   * Recursion Links
   */
  const renderLinks = useCallback((content) => {
    if (!content.items) return null;

    function renderLink(items) {
      return items.map((item) => (
        <Anchor.Link href={item.url} title={item.title} key={item.url}>
          {item.items ? renderLink(item.items) : null}
        </Anchor.Link>
      ));
    }
    return renderLink(content.items);
  }, []);

  return (
    <Layout sideBlocks={<Comment />}>
      <SEO title={title} description={description || excerpt} />
      <article>
        <header>
          <h1 style={{ textAlign: 'center' }}>{title}</h1>
          <p
            style={{
              display: 'block',
              marginBottom: '1.6em',
              color: '#999999',
              textAlign: 'center',
            }}
          >
            {date}
            <span style={{ marginLeft: '1em' }}>{categories}</span>
            <a
              className={styles.licence}
              rel="license"
              // eslint-disable-next-line react/jsx-no-target-blank
              target="_blank"
              href="http://creativecommons.org/licenses/by-nc/4.0/"
              title="This work is licensed under a Creative Commons Attribution-NonCommercial 4.0 International License."
            >
              <svg
                fill="currentColor"
                viewBox="0 0 110 32"
                width={`${(110 / 32) * 1.1}em`}
                height="1.1em"
              >
                <path d="M16.144.95c-4.09 0-7.695 1.526-10.482 4.37C2.8 8.25 1.242 12.04 1.242 16c0 3.998 1.517 7.708 4.38 10.594 2.87 2.89 6.59 4.455 10.522 4.455 3.93 0 7.738-1.57 10.684-4.5 2.782-2.76 4.255-6.43 4.255-10.55 0-4.09-1.472-7.8-4.296-10.64C23.923 2.47 20.237.95 16.14.95zm.04 2.72c3.358 0 6.343 1.28 8.68 3.63 2.29 2.31 3.52 5.36 3.52 8.7 0 3.378-1.19 6.347-3.48 8.616-2.417 2.39-5.528 3.67-8.72 3.67-3.23 0-6.263-1.28-8.594-3.63C5.255 22.31 3.945 19.216 3.945 16c0-3.258 1.312-6.348 3.645-8.74 2.292-2.353 5.24-3.592 8.598-3.592zm-.193 9.83c-.84-1.55-2.28-2.17-3.95-2.17-2.43 0-4.37 1.737-4.37 4.67 0 2.986 1.82 4.668 4.46 4.668 1.69 0 3.13-.932 3.92-2.35l-1.85-.95c-.41 1.004-1.04 1.302-1.83 1.302-1.374 0-2.003-1.15-2.003-2.67 0-1.514.53-2.664 2.005-2.664.395 0 1.19.22 1.65 1.22L16 13.503zm8.62 0c-.84-1.55-2.28-2.17-3.95-2.17-2.43 0-4.37 1.737-4.37 4.67 0 2.986 1.82 4.668 4.46 4.668 1.69 0 3.13-.932 3.93-2.35l-1.854-.95c-.416 1.004-1.045 1.302-1.84 1.302-1.37 0-2.006-1.15-2.006-2.67 0-1.514.53-2.664 2-2.664.394 0 1.19.22 1.652 1.22l1.984-1.053zm34.41-1.223c0-.536-.43-.97-.96-.97h-6.11c-.53 0-.96.434-.96.97v6.15h1.71v7.278h4.63v-7.278h1.705v-6.15zm-1.92-3.88c0 1.16-.93 2.102-2.08 2.102s-2.09-.95-2.09-2.11.94-2.11 2.09-2.11 2.08.95 2.08 2.11zM54.99.973c-4.136 0-7.63 1.45-10.5 4.357-2.94 3.003-4.41 6.562-4.41 10.67s1.474 7.64 4.41 10.594c2.942 2.955 6.437 4.434 10.502 4.434 4.11 0 7.67-1.493 10.68-4.476 2.847-2.833 4.263-6.347 4.263-10.558 0-4.208-1.44-7.764-4.33-10.675C62.718 2.41 59.183.96 54.997.96zm.032 2.703c3.39 0 6.263 1.202 8.63 3.61 2.39 2.38 3.583 5.28 3.583 8.714 0 3.456-1.164 6.326-3.505 8.602-2.464 2.457-5.363 3.683-8.702 3.683-3.338 0-6.213-1.212-8.628-3.643-2.414-2.43-3.625-5.31-3.625-8.642S44 9.765 46.44 7.284c2.34-2.406 5.208-3.61 8.593-3.61zm38.8-2.703c4.187 0 7.72 1.45 10.61 4.357 2.89 2.907 4.33 6.463 4.33 10.67 0 4.21-1.42 7.726-4.26 10.56-3.01 2.978-6.57 4.47-10.68 4.47-4.05 0-7.56-1.474-10.49-4.433-2.94-2.95-4.403-6.488-4.403-10.593 0-4.105 1.46-7.664 4.4-10.667C86.19 2.43 89.69.977 93.82.977zM82.28 11.965c-.442 1.267-.664 2.61-.664 4.035 0 3.33 1.206 6.213 3.62 8.64 2.417 2.433 5.29 3.645 8.627 3.645 3.34 0 6.24-1.226 8.71-3.683.83-.8 1.5-1.675 2.04-2.63l-5.622-2.52c-.38 1.902-2.06 3.19-4.1 3.347v2.31h-1.72V22.8c-1.67-.026-3.29-.716-4.52-1.803l2.06-2.09c.99.934 1.975 1.36 3.33 1.36.873 0 1.845-.35 1.845-1.5 0-.402-.154-.69-.402-.9l-1.42-.638-1.77-.8-2.365-1.06-7.623-3.42zm11.583-8.29c-3.38 0-6.24 1.203-8.58 3.61-.64.643-1.19 1.324-1.66 2.03l5.707 2.554c.514-1.6 2.02-2.57 3.843-2.67V6.88h1.716v2.312c1.17.057 2.47.383 3.74 1.378l-1.96 2.03c-.726-.514-1.637-.88-2.55-.88-.74 0-1.788.23-1.788 1.17 0 .142.05.267.133.38l1.91.855 1.29.58 2.396 1.073 7.644 3.43c.253-1.01.38-2.08.38-3.218 0-3.43-1.196-6.337-3.59-8.717-2.364-2.404-5.24-3.606-8.63-3.606z" />
              </svg>
            </a>
          </p>
        </header>
        {!!tableOfContents && width < 1110 && (
          <div className={styles.tableContents}>
            <Anchor
              getContainer={() => document.body as HTMLElement}
              targetOffset={200}
              affix={false}
            >
              {renderLinks(tableOfContents)}
            </Anchor>
          </div>
        )}
        <section className={styles.container}>
          <MDXProvider components={{ code: CodeBlock }}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
        </section>
        <hr
          style={{
            marginBottom: '1.6em',
          }}
        />
        <Tags tags={tags} />
      </article>

      <nav>
        <ul className={styles.lead}>
          <li style={{ textAlign: 'left' }}>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li style={{ textAlign: 'right' }}>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

export default SnippetPostTemplate;

export const pageQuery = graphql`
  query SnippetPostQuery($id: String) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
        date(formatString: "YYYY/MM/DD")
        description
        tags
        categories
      }
      body
      excerpt
      tableOfContents
    }
  }
`;
