import React, { useEffect, useMemo } from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../layout/BlogLayout';
import SEO from '../components/seo';
import { rhythm, scale } from '../utils/typography';
import styles from '../styles/Blog.module.less';
import Tags from '../components/Tags';
import { useDispatch } from 'react-redux';
import useWindowSize from '../hooks/useWindowSize';
import 'gitalk/dist/gitalk.css';
import Gitalk from 'gitalk';
// @ts-ignore
import GitalkComponent from 'gitalk/dist/gitalk-component';
import { gittalkOptions } from '../assets/js/gittalk';

interface IProps {
  data: {
    markdownRemark: any;
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
  pageContext: any;
  tableOfContents: any;
  location: any;
}
const BlogPostTemplate: React.FC<IProps> = ({
  data,
  pageContext,
  location,
}) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;
  const { tags } = post.frontmatter;
  const dispatch = useDispatch();
  const [width] = useWindowSize();

  useEffect(() => {
    dispatch({ type: 'TITLE', payload: post.frontmatter.title });
    return () => {
      dispatch({ type: 'TITLE', payload: '' });
    };
  }, [post.frontmatter.title, dispatch]);

  let gitalkConfig = {
    ...gittalkOptions,
    id: decodeURIComponent(location.pathname).substring(0, 49),
    title: post.frontmatter.title,
  };

  const renderGitalk = useMemo(() => {
    if (typeof window !== 'undefined') {
      if (post) {
        return <GitalkComponent options={gitalkConfig} />;
      }
    }
    return <></>;
  }, [post]);

  return (
    <>
      <Layout
        location={location}
        title={siteTitle}
        hasCatalog={true}
        content={post.tableOfContents}
      >
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article>
          <header>
            <h1 style={{ textAlign: 'center' }}>{post.frontmatter.title}</h1>
            <p
              style={{
                ...scale(-1 / 5),
                display: `block`,
                marginBottom: rhythm(1),
                color: '#999999',
                textAlign: 'center',
              }}
            >
              {post.frontmatter.date}
            </p>
          </header>
          {!!post.tableOfContents && width < 1110 && (
            <div
              className={styles.tableContents}
              dangerouslySetInnerHTML={{ __html: post.tableOfContents }}
            />
          )}
          <section
            dangerouslySetInnerHTML={{ __html: post.html }}
            className={styles.container}
          />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <Tags tags={tags} />
        </article>

        <nav>
          <ul className={styles.lead}>
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
        {renderGitalk}
      </Layout>
    </>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      tableOfContents
      html
      frontmatter {
        title
        date(formatString: "YYYY/MM/DD")
        description
        tags
      }
    }
  }
`;
