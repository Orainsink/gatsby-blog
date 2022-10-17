/* eslint-disable react/jsx-no-target-blank */
import { useCallback, ReactElement } from 'react';
import { Link, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { Anchor } from 'antd';

import { Layout } from '../layout/BlogLayout';
import { SeoHelmet } from '../components/SeoHelmet';
import { Tags } from '../components/Tags';
import * as styles from './index.module.less';
import { ImgBlock, CodeBlock, AnchorBlock } from '../components/MDXComponents';
import { useMedia } from '../hooks';
import { generatePath } from '../utils/generatePath';
import { Contents } from '../components/SideBlocks';
import { Comment } from '../components/Comment';
import { ReactComponent as LicenseSvg } from '../assets/img/license.svg';
import { GetSnippetPostQuery } from '../../graphql-types';
import {
  DeepRequiredAndNonNullable,
  TableOfContents,
} from '../../typings/custom';

type Data = DeepRequiredAndNonNullable<GetSnippetPostQuery>;
interface Props {
  data: Data;
  pageContext: {
    previous: any;
    next: any;
    id: string;
  };
}

const SnippetPostTemplate = ({
  data: { mdx },
  pageContext,
}: Props): ReactElement => {
  const {
    frontmatter: { title, tags, description, date, categories },
    excerpt,
    tableOfContents,
  } = mdx;
  const { previous, next } = pageContext;
  const isDesktop = useMedia('isDesktop');

  /**
   * Recursion Links
   */
  const renderLinks = useCallback((content: TableOfContents) => {
    if (!content.items) return null;

    const renderLink = (items: TableOfContents[]) => {
      return items.map((item) => (
        <Anchor.Link href={item.url} title={item.title} key={item.url}>
          {item.items ? renderLink(item.items) : null}
        </Anchor.Link>
      ));
    };
    return renderLink(content.items);
  }, []);

  return (
    <Layout sideBlocks={isDesktop && <Contents contents={tableOfContents} />}>
      <SeoHelmet title={title} description={description || excerpt} />
      <article>
        <header>
          <h1 style={{ textAlign: 'center', fontWeight: 700 }}>{title}</h1>
          <div
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
              target="_blank"
              href="http://creativecommons.org/licenses/by-nc/4.0/"
              title="This work is licensed under a Creative Commons Attribution-NonCommercial 4.0 International License."
            >
              <LicenseSvg />
            </a>
          </div>
        </header>
        {!!tableOfContents && !isDesktop && (
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
          <MDXProvider
            components={{
              code: CodeBlock,
              img: ImgBlock,
              a: AnchorBlock,
            }}
          >
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
        </section>
        <hr
          style={{
            marginBottom: '1.6em',
          }}
        />
        <Tags tags={tags} category={categories} />
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
      {mdx && <Comment />}
    </Layout>
  );
};

export default SnippetPostTemplate;

export const pageQuery = graphql`
  query getSnippetPost($id: String) {
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
