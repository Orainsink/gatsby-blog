/* eslint-disable react/jsx-no-target-blank */
import { Link, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { ReactElement } from 'react';

import { Layout } from '../layout/BlogLayout';
import { SeoHelmet } from '../components/SeoHelmet';
import { Tags } from '../components/Tags';
import { Anchor } from '../components/Anchor';
import { Contents } from '../components/SideBlocks/Contents';
import { useMedia } from '../hooks';
import { generatePath } from '../utils/generatePath';
import { ImgBlock, CodeBlock, AnchorBlock } from '../components/MDXComponents';
import { ReactComponent as LicenseSvg } from '../assets/img/license.svg';
import { Comment } from '../components/Comment';
import { GetBlogPostQuery } from '../../graphql-types';
import { DeepRequiredAndNonNullable } from '../../typings/custom';
import { Container, LeadUl, License, TableContents } from './Templates.styles';

type Data = DeepRequiredAndNonNullable<GetBlogPostQuery>;
interface Props {
  data: Data;
  pageContext: {
    previous: any;
    next: any;
    id: string;
  };
}

const BlogPostTemplate = ({
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
            <MDXRenderer>{mdx.body}</MDXRenderer>
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

export default BlogPostTemplate;

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
      body
      excerpt
      tableOfContents
    }
  }
`;
