/* eslint-disable react/jsx-no-target-blank */
import { graphql } from 'gatsby';
import { ReactElement, ReactNode } from 'react';
import { isEmpty } from 'ramda';

import { Layout } from '../layout/BlogLayout';
import { Seo } from '../components/Seo';
import { Tags } from '../components/Tags';
import { Anchor } from '../components/Anchor';
import { Contents } from '../components/SideBlocks/Contents';
import { useMedia } from '../hooks';
import { MdxParser } from '../components/MDXComponents';
import { ReactComponent as LicenseSvg } from '../assets/img/license.svg';
import { Comment } from '../components/Comment';
import { DeepRequiredAndNonNullable } from '../../typings/custom';
import {
  Article,
  Container,
  License,
  PostHr,
  TableContents,
  Subtitle,
  MajorTitle,
} from './Templates.styles';

type Data = DeepRequiredAndNonNullable<Queries.getBlogPostQuery>;
interface Props {
  data: Data;
  children: ReactNode;
}

const BlogPostTemplate = ({ data: { mdx }, children }: Props): ReactElement => {
  const {
    frontmatter: { title, tags, date, categories },
    tableOfContents,
  } = mdx;
  const isDesktop = useMedia('isDesktop');

  const hasTableOfContents = tableOfContents && isEmpty(tableOfContents);

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
        {hasTableOfContents && !isDesktop && (
          <TableContents>
            <Anchor contents={tableOfContents as any} />
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

export default BlogPostTemplate;

export const Head = ({ data: { mdx } }: Pick<Props, 'data'>) => {
  const {
    frontmatter: { title, description },
    excerpt,
  } = mdx;

  return <Seo title={title} description={description || excerpt} />;
};

export const pageQuery = graphql`
  query getBlogPost($id: String) {
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
