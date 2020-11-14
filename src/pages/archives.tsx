import React, { useEffect } from 'react';
import { PageProps, graphql } from 'gatsby';
import { Divider } from 'antd';
import Layout from '../layout/BlogLayout';
import SEO from '../components/seo';
import { useSelector, useDispatch } from 'react-redux';
import loadable from '@loadable/component';
import { ReloadOutlined } from '@ant-design/icons';
import styles from '../styles/archives.module.less';
import PostList from '../components/PostList';
import Calendar from '../components/SideBlocks/Calendar';
const WordCloud = loadable(() => import('../components/WordCloud'));

interface Data {
  allFile: {
    edges: ChildMdxItem[];
  };
}

const ArchivesPage = ({ data, location }: PageProps<Data>) => {
  const { curTag, curDate } = useSelector((state) => state);
  const dispatch = useDispatch();
  const posts = data.allFile.edges.filter((item) => item.node.childMdx);

  useEffect(() => {
    return () => {
      dispatch({
        type: 'RESET_SEARCH',
      });
    };
  }, [dispatch]);

  return (
    <Layout location={location} sideBlocks={<Calendar posts={posts} />}>
      <SEO title="Archives" />
      <WordCloud />
      <Divider orientation="center" className={styles.divider}>
        {curTag ? '#' + curTag : curDate ? curDate : 'ARCHIVES'}
        {curTag || curDate ? (
          <ReloadOutlined
            className={styles.reloadIcon}
            onClick={() => dispatch({ type: 'RESET_SEARCH' })}
          />
        ) : null}
      </Divider>
      <PostList posts={posts} hideMore />
    </Layout>
  );
};

export default React.memo(ArchivesPage);

export const pageQuery = graphql`
  {
    allFile(
      filter: { sourceInstanceName: { eq: "blog" } }
      sort: { fields: childMdx___frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          childMdx {
            frontmatter {
              date(formatString: "YYYY/MM/DD")
              title
              description
              tags
            }
            fields {
              slug
            }
            excerpt
          }
        }
      }
    }
  }
`;
