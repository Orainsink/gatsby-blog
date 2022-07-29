import { useCallback, ReactElement } from 'react';
import { PageProps, graphql, navigate } from 'gatsby';
import { Card, Divider } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { getImage, GatsbyImage, ImageDataLike } from 'gatsby-plugin-image';

import { Layout } from '../layout/BlogLayout';
import { SeoHelmet } from '../components/SeoHelmet';
import * as styles from './archives/index.module.less';
import { useResetKey } from '../hooks';
import { generatePath } from '../utils/generatePath';
import { DeepRequiredAndNonNullable } from '../../typings/custom';
import { GetEssayDataQuery } from '../../graphql-types';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { filterAtom } from '../store/atom';

type Data = DeepRequiredAndNonNullable<GetEssayDataQuery>;
const EssayPage = ({ data }: PageProps<Data>): ReactElement => {
  const { curDate } = useRecoilValue(filterAtom);
  const resetFilter = useResetRecoilState(filterAtom);
  const posts = data.allFile.edges.filter((item) => item.node.childMdx);

  const getImg = useCallback(
    (relativeDirectory: string) => {
      const node = data.images.edges.find((image) =>
        relativeDirectory.startsWith(`/${image.node.relativeDirectory}`)
      )?.node;
      if (node) {
        return getImage(node as unknown as ImageDataLike);
      } else return null;
    },
    [data]
  );

  useResetKey();

  const renderPostCard = useCallback(
    ({
      node: {
        childMdx: { frontmatter, fields },
      },
    }: typeof posts[number]) => {
      return (
        <Card
          onClick={() =>
            navigate(generatePath(frontmatter.categories, fields.slug))
          }
          key={frontmatter.title}
          hoverable
          className={styles.essayItem}
          cover={
            <GatsbyImage
              image={getImg(fields.slug)!}
              style={{ width: '100%' }}
              alt=""
            />
          }
        >
          <p className={styles.metaTitle}>{frontmatter.title}</p>
          <p>{frontmatter.date}</p>
          <p>{frontmatter.description}</p>
        </Card>
      );
    },
    [getImg]
  );

  return (
    <Layout>
      <SeoHelmet title="随笔-归档" />
      <Divider orientation="center" className={styles.divider}>
        {curDate ? curDate : '随笔'}
        {curDate ? (
          <ReloadOutlined className={styles.reloadIcon} onClick={resetFilter} />
        ) : null}
      </Divider>
      {!!posts && (
        <div className={styles.essayCards}>{posts.map(renderPostCard)}</div>
      )}
    </Layout>
  );
};

export default EssayPage;

export const pageQuery = graphql`
  query getEssayData {
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
