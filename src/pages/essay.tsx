import React, { useCallback } from 'react';
import { PageProps, graphql, navigate } from 'gatsby';
import { Card, Divider } from 'antd';
import Layout from '../layout/BlogLayout';
import SEO from '../components/seo';
import { useSelector, useDispatch } from 'react-redux';
import { ReloadOutlined } from '@ant-design/icons';
import * as styles from './archives/index.module.less';
import { useResetKey } from '../hooks';
import { getImage, GatsbyImage } from 'gatsby-plugin-image';
import generatePath from '../utils/generatePath';
import { iRootState } from '../redux/store';

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

const EssayPage = ({ data }: PageProps<Data>) => {
  const { curDate } = useSelector((state: iRootState) => state);
  const dispatch = useDispatch();
  const posts = data.allFile.edges.filter((item) => item.node.childMdx);

  const getImg = useCallback(
    (relativeDirectory: string) => {
      const node: any = data.images.edges.find(
        (image) => image.node.relativeDirectory === relativeDirectory
      )?.node;
      if (node) {
        return getImage(node);
      } else return null;
    },
    [data]
  );

  useResetKey();

  return (
    <Layout>
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
              onClick={() =>
                navigate(
                  generatePath(item.frontmatter.categories, item.fields.slug)
                )
              }
              key={item.frontmatter.title}
              hoverable
              className={styles.essayItem}
              cover={
                <GatsbyImage
                  image={getImg(item.frontmatter.title)}
                  style={{ width: '100%' }}
                  alt=""
                />
              }
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
      filter: {
        sourceInstanceName: { eq: "essay" }
        extension: { in: ["md", "mdx"] }
      }
      sort: { fields: childMdx___frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          childMdx {
            id
            frontmatter {
              date(formatString: "YYYY/MM/DD")
              title
              description
              categories
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
        extension: { in: ["png", "jpg"] }
      }
    ) {
      edges {
        node {
          relativeDirectory
          childImageSharp {
            gatsbyImageData(width: 370, height: 210)
          }
        }
      }
    }
  }
`;
