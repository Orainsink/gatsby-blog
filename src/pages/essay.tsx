import React from 'react';
import { PageProps, graphql, navigate } from 'gatsby';
import { Divider, Card } from 'antd';
import Layout from '../layout/BlogLayout';
import SEO from '../components/seo';
import { useSelector, useDispatch } from 'react-redux';
import { ReloadOutlined } from '@ant-design/icons';
import styles from '../styles/archives.module.less';
import Calendar from '../components/SideBlocks/Calendar';
import useResetKey from '../hooks/useResetKey';

interface Data {
  allFile: {
    edges: ChildMdxItem[];
  };
}

const EssayPage = ({ data, location }: PageProps<Data>) => {
  const { curDate } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const posts = data.allFile.edges.filter((item) => item.node.childMdx);

  useResetKey();

  return (
    <Layout location={location}>
      <SEO title="随笔" />
      <Divider orientation="center" className={styles.divider}>
        {curDate ? curDate : '随笔'}
        {curDate ? (
          <ReloadOutlined
            className={styles.reloadIcon}
            onClick={() => dispatch({ type: 'RESET_SEARCH' })}
          />
        ) : null}
      </Divider>
      {!!posts && (
        <div className={styles.essayCards}>
          {posts.map(({ node: { childMdx: item } }) => (
            <Card
              onClick={() => navigate(item.fields.slug ?? '/')}
              key={item.frontmatter.title}
              hoverable
              className={styles.essayItem}
              cover={<img alt="" src={item.frontmatter.url} />}
            >
              <p className={styles.metaTitle}>{item.frontmatter.title}</p>
              <p>{item.frontmatter.date}</p>
              <p>{item.frontmatter.description}</p>
            </Card>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default EssayPage;

export const pageQuery = graphql`
  {
    allFile(
      filter: { sourceInstanceName: { eq: "essay" } }
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
              url
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
