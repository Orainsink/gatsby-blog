// Gatsby supports TypeScript natively!
import * as React from 'react';
import { useMemo } from 'react';
import { PageProps, Link, graphql } from 'gatsby';
import '../styles/index.module.less';

import Bio from '../components/bio';
import Layout from '../layout/IndexLayout';
import SEO from '../components/seo';
import Dynamic from '../components/Dynamic';
import Trigger from '../components/Trigger';
import { rhythm } from '../utils/typography';
import MainProvider from '../context/MainContext';

type Data = {
  site: {
    siteMetadata: {
      title: string;
    };
  };
  allMarkdownRemark: {
    edges: {
      node: {
        excerpt: string;
        frontmatter: {
          title: string;
          date: string;
          description: string;
        };
        fields: {
          slug: string;
        };
      };
    }[];
  };
};

const BlogIndex = ({ data, location }: PageProps<Data>) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  const skipScene = useMemo(() => {
    if (typeof window !== 'undefined') {
      return !!window.sessionStorage.getItem('skipscene');
    } else return false;
  }, []);

  return (
    <MainProvider>
      {!skipScene && <Dynamic />}
      <Trigger />
      <Layout location={location} title={siteTitle} skip={skipScene}>
        <SEO title="All posts" />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          return (
            <article key={node.fields.slug}>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </article>
          );
        })}
      </Layout>
    </MainProvider>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
