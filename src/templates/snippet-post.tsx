/* eslint-disable react/jsx-no-target-blank */
import { useCallback, ReactElement, ReactNode } from 'react';
import { Link, graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { Anchor } from 'antd';

import { Layout } from '../layout/BlogLayout';
import { Seo } from '../components/Seo';
import { Tags } from '../components/Tags';
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
import { Container, LeadUl, License, TableContents } from './Templates.styles';

type Data = DeepRequiredAndNonNullable<GetSnippetPostQuery>;
interface Props {
  data: Data;
  children: ReactNode;
  pageContext: {
    previous: any;
    next: any;
    id: string;
  };
}

const SnippetPostTemplate = ({
  data: { mdx },
  children,
  pageContext,
}: Props): ReactElement => {
  const {
    frontmatter: { title, tags, date, categories },
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
        <Anchor.Link href={item.url!} title={item.title} key={item.url}>
          {item.items ? renderLink(item.items) : null}
        </Anchor.Link>
      ));
    };
    return renderLink(content.items);
  }, []);

  return (
    <Layout sideBlocks={isDesktop && <Contents contents={tableOfContents} />}>
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
            <License
              rel="license"
              target="_blank"
              href="http://creativecommons.org/licenses/by-nc/4.0/"
              title="This work is licensed under a Creative Commons Attribution-NonCommercial 4.0 International License."
            >
              <LicenseSvg />
            </License>
          </div>
        </header>
        {!!tableOfContents && !isDesktop && (
          <TableContents>
            <Anchor
              getContainer={() => document.body as HTMLElement}
              targetOffset={200}
              affix={false}
            >
              {renderLinks(tableOfContents)}
            </Anchor>
          </TableContents>
        )}
        <Container>
          <MDXProvider
            components={{
              code: CodeBlock,
              img: ImgBlock,
              a: AnchorBlock,
            }}
          >
            {children}
          </MDXProvider>
        </Container>
        <hr
          style={{
            marginBottom: '1.6em',
          }}
        />
        <Tags tags={tags} category={categories} />
      </article>

      <nav>
        <LeadUl>
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
        </LeadUl>
      </nav>
      {mdx && <Comment />}
    </Layout>
  );
};

export default SnippetPostTemplate;

export const Head = ({ data: { mdx } }: Pick<Props, 'data'>) => {
  const {
    frontmatter: { title, description },
    excerpt,
  } = mdx;

  return <Seo title={title} description={description || excerpt} />;
};

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
      excerpt
      tableOfContents
    }
  }
`;
