/* eslint-disable react/jsx-no-target-blank */
import { useCallback, ReactElement, ReactNode } from 'react';
import { graphql } from 'gatsby';
import { Anchor } from 'antd';

import { Layout } from '../layout/BlogLayout';
import { Seo } from '../components/Seo';
import { Tags } from '../components/Tags';
import { MdxParser } from '../components/MDXComponents';
import { useMedia } from '../hooks';
import { Contents } from '../components/SideBlocks';
import { Comment } from '../components/Comment';
import { ReactComponent as LicenseSvg } from '../assets/img/license.svg';
import {
  DeepRequiredAndNonNullable,
  TableOfContents,
} from '../../typings/custom';
import {
  Article,
  Container,
  License,
  MajorTitle,
  PostHr,
  Subtitle,
  TableContents,
} from './Templates.styles';

type Data = DeepRequiredAndNonNullable<Queries.getSnippetPostQuery>;
interface Props {
  data: Data;
  children: ReactNode;
}

const SnippetPostTemplate = ({
  data: { mdx },
  children,
}: Props): ReactElement => {
  const {
    frontmatter: { title, tags, date, categories },
    tableOfContents,
  } = mdx;
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
      <Article>
        <header>
          <MajorTitle>{title}</MajorTitle>
          <Subtitle>
            {date}
            <span style={{ marginLeft: 'var(--space-md)' }}>{categories}</span>
            <License
              rel="license"
              target="_blank"
              href="http://creativecommons.org/licenses/by-nc/4.0/"
              title="This work is licensed under a Creative Commons Attribution-NonCommercial 4.0 International License."
            >
              <LicenseSvg />
            </License>
          </Subtitle>
        </header>
        {tableOfContents && !isDesktop && (
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
          <MdxParser>{children}</MdxParser>
        </Container>
        <PostHr />
        <Tags tags={tags} category={categories} />
      </Article>
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
