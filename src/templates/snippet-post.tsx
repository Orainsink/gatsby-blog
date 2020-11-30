import React, { useCallback } from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../layout/BlogLayout';
import SEO from '../components/seo';
import Tags from '../components/Tags';
import styles from '../styles/Blog.module.less';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { Anchor } from 'antd';
import CodeBlock from '../components/MDXComponents/CodeBlock';
import useMedia from '../hooks/useMedia';
import generatePath from '../utils/generatePath';
import Contents from '../components/SideBlocks/Contents';
import MyGitalk from '../components/MyGitalk';
import { ReactComponent as LicenseSvg } from '../assets/img/license.svg';
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
  const is1110 = useMedia('(max-width: 1110px)');

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
    <Layout sideBlocks={is1110 ? null : <Contents content={tableOfContents} />}>
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
              <LicenseSvg />
            </a>
          </p>
        </header>
        {!!tableOfContents && is1110 && (
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
        <Tags tags={tags} categories={categories} />
      </article>

      <nav>
        <ul className={styles.lead}>
          <li style={{ textAlign: 'left' }}>
            {previous && (
              <Link
                to={generatePath(previous.frontmatter.categories, previous.id)}
                rel="prev"
              >
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li style={{ textAlign: 'right' }}>
            {next && (
              <Link
                to={generatePath(next.frontmatter.categories, next.id)}
                rel="next"
              >
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
      {mdx && <MyGitalk title={title} />}
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
