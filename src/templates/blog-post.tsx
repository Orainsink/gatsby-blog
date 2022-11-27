/* eslint-disable react/jsx-no-target-blank */
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

import { Layout } from '../layout/BlogLayout';
import { Seo } from '../components/Seo';
import { Tags } from '../components/Tags';
import { Anchor } from '../components/Anchor';
import { Contents } from '../components/SideBlocks/Contents';
import { useMedia } from '../hooks';
import { ImgBlock, CodeBlock, AnchorBlock } from '../components/MDXComponents';
import { ReactComponent as LicenseSvg } from '../assets/img/license.svg';
import { Comment } from '../components/Comment';
import { DeepRequiredAndNonNullable } from '../../typings/custom';
import { Article, Container, License, TableContents } from './Templates.styles';
import { PreAndNext } from './components/PreAndNext';

const Subtitle = styled.div`
  margin-bottom: 1.6em;
  color: var(--color-text-secondary);
  text-align: center;

  a {
    color: inherit;
    text-decoration: underline;
  }
`;

type Data = DeepRequiredAndNonNullable<Queries.getBlogPostQuery>;
interface Props {
  data: Data;
  children: ReactNode;
  pageContext: {
    previous: any;
    next: any;
    id: string;
  };
}

const BlogPostTemplate = ({
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

  return (
    <Layout sideBlocks={isDesktop && <Contents contents={tableOfContents} />}>
      <Article>
        <header>
          <h1 style={{ textAlign: 'center', fontWeight: 700 }}>{title}</h1>
          <Subtitle>
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
          </Subtitle>
        </header>
        {!!tableOfContents && !isDesktop && (
          <TableContents>
            <Anchor
              targetOffset={200}
              affix={false}
              contents={tableOfContents as any}
            />
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
      </Article>

      <PreAndNext previous={previous} next={next} />
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
