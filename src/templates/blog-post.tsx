import React, { useCallback } from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../layout/BlogLayout';
import SEO from '../components/seo';
import Tags from '../components/Tags';
import styles from '../styles/Blog.module.less';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { Anchor } from 'antd';
import { Contents } from '../components/SideBlocks';
import MyGitalk from '../components/MyGitalk';
import useMedia from '../hooks/useMedia';
import generatePath from '../utils/generatePath';
import { ImgBlock, CodeBlock, AnchorBlock } from '../components/MDXComponents';
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
    previous: MarkdownRemark;
    next: MarkdownRemark;
    id: string;
  };
}
const BlogPostTemplate = ({ data: { mdx }, pageContext }: Props) => {
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
              // eslint-disable-next-line
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
            <Anchor targetOffset={200} affix={false}>
              {renderLinks(tableOfContents)}
            </Anchor>
          </div>
        )}
        <section className={styles.container}>
          <MDXProvider
            components={{ code: CodeBlock, img: ImgBlock, a: AnchorBlock }}
          >
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
                to={generatePath(
                  previous.frontmatter.categories,
                  previous.fields.slug
                )}
                rel="prev"
              >
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li style={{ textAlign: 'right' }}>
            {next && (
              <Link
                to={generatePath(next.frontmatter.categories, next.fields.slug)}
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

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
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
      fields {
        slug
      }
      body
      excerpt
      tableOfContents
    }
  }
`;
