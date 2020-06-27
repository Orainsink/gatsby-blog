import React, { useCallback } from 'react';
import Loadable from '@loadable/component';

import { PageProps, Link, graphql } from 'gatsby';
import Layout from '../layout/IndexLayout';
import SEO from '../components/seo';
import Trigger from '../components/Trigger';
import { rhythm } from '../utils/typography';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';
import Poem from '../components/Poem';
import TagsSnippet from '../components/TagsSnippet';

// magic comments
// https://loadable-components.com/docs/babel-plugin/#magic-comments
const Dyn = /* #__LOADABLE__ */ () => import('../components/Dynamic');
const Dynamic = Loadable(Dyn);

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
    group: {
      totalCount: number;
      tag: string;
    }[];
  };
};

const Index = ({ data, location }: PageProps<Data>) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;
  const tags = data.allMarkdownRemark.group;
  const { skip } = useSelector((state) => state);

  return (
    <>
      <Trigger />
      {!skip && <Dynamic fallback={<Loading debounce={500} />} />}
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />

        <TagsSnippet />
        <Poem />
        <h5
          style={{
            textAlign: 'center',
            padding: '2em 0',
            margin: 0,
          }}
        >
          最近文章：
        </h5>
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
                  style={{ color: 'rgb(0,0,0,0.45)' }}
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </article>
          );
        })}
        <h5
          style={{
            textAlign: 'center',
            padding: '1em 0',
            margin: 0,
          }}
        >
          <Link to={'/archives'}>查看全部</Link>
        </h5>
      </Layout>
    </>
  );
};

export default Index;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 10
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY/MM/DD")
            title
            description
          }
        }
      }
    }
  }
`;
