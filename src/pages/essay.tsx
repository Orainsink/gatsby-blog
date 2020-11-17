import React, { useCallback } from 'react';
import { PageProps, graphql, navigate } from 'gatsby';
import { Divider, Card } from 'antd';
import Layout from '../layout/BlogLayout';
import SEO from '../components/seo';
import { useSelector, useDispatch } from 'react-redux';
import { ReloadOutlined } from '@ant-design/icons';
import styles from '../styles/archives.module.less';
import useResetKey from '../hooks/useResetKey';
import Image from 'gatsby-image';

interface Data {
  allFile: {
    edges: ChildMdxItem[];
  };
  images: {
    edges: {
      node: {
        relativeDirectory: string;
        childImageSharp: any;
      };
    }[];
  };
}

const EssayPage = ({ data, location }: PageProps<Data>) => {
  const { curDate } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const posts = data.allFile.edges.filter((item) => item.node.childMdx);

  const getImg = useCallback(
    (relativeDirectory: string) => {
      return data.images.edges.find(
        (image) => image.node.relativeDirectory === relativeDirectory
      )?.node.childImageSharp.fixed;
    },
    [data]
  );

  useResetKey();

  return (
    <Layout location={location}>
      <SEO title="随笔-归档" />
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
              cover={<Image fixed={getImg(item.frontmatter.title)} />}
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
  query essayQuery {
    allFile(
      filter: { sourceInstanceName: { eq: "essay" }, extension: { glob: "md" } }
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
    images: allFile(
      filter: {
        sourceInstanceName: { eq: "essay" }
        extension: { glob: "png" }
      }
    ) {
      edges {
        node {
          relativeDirectory
          childImageSharp {
            fixed(width: 370, height: 210) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`;

/* relativeDirectory
          childImageSharp {
            fixed(width: 370, height: 210) {
              ...GatsbyImageSharpFixed
            }
          } */
