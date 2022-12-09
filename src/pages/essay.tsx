import { useCallback, ReactElement } from 'react';
import { PageProps, graphql, navigate } from 'gatsby';
import { Card } from 'antd';
import { getImage, GatsbyImage, ImageDataLike } from 'gatsby-plugin-image';
import styled from 'styled-components';

import { Layout } from '../layout/BlogLayout';
import { Seo } from '../components/Seo';
import { useResetKey } from '../hooks';
import { generatePath } from '../utils/generatePath';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { filterAtom } from '../store/atom';
import { PageDivider, ReloadIcon } from '../layout/Pages.styles';
import { DeepRequiredAndNonNullable } from '../../typings/custom';

const EssayCard = styled(Card)`
  width: 45%;
  max-width: 440px;
  margin: var(--space-md);
  ${({ theme }) => theme.media.isMobile} {
    width: 90%;
  }
`;

const EssayCards = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  row-gap: var(--space-lg);

  .ant-card-cover {
    min-height: 180px;
  }
`;

const MetaTittle = styled.p`
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-lg);
`;

type Data = DeepRequiredAndNonNullable<Queries.getEssayDataQuery>;
const EssayPage = ({ data }: PageProps<Data>): ReactElement => {
  const { curDate } = useRecoilValue(filterAtom);
  const resetFilter = useResetRecoilState(filterAtom);
  const posts = data.allFile.edges.filter((item) => item.node.childMdx);

  const getImg = useCallback(
    (relativeDirectory: string) => {
      const node = data.images.edges.find((image) =>
        relativeDirectory.startsWith(`/${image.node.relativeDirectory}`)
      )?.node;
      return getImage(node as unknown as ImageDataLike);
    },
    [data]
  );

  useResetKey();

  const renderPostCard = useCallback(
    ({
      node: {
        childMdx: {
          frontmatter: { categories, title, date, description },
          fields,
        },
      },
    }: typeof posts[number]) => {
      return (
        <EssayCard
          onClick={() => navigate(generatePath(categories, title))}
          key={title}
          hoverable
          cover={
            <GatsbyImage
              image={getImg(fields.slug)!}
              style={{ width: '100%' }}
              alt=""
            />
          }
        >
          <MetaTittle>{title}</MetaTittle>
          <p>{date}</p>
          <p>{description}</p>
        </EssayCard>
      );
    },
    [getImg]
  );

  return (
    <Layout>
      <PageDivider orientation="center">
        {curDate ? curDate : '随笔'}
        {curDate ? <ReloadIcon onClick={resetFilter} /> : null}
      </PageDivider>
      {!!posts && <EssayCards>{posts.map(renderPostCard)}</EssayCards>}
    </Layout>
  );
};

export default EssayPage;

export const Head = () => <Seo title="随笔-归档" />;

export const pageQuery = graphql`
  query getEssayData {
    allFile(
      filter: {
        sourceInstanceName: { eq: "essay" }
        extension: { in: ["md", "mdx"] }
      }
      sort: { childMdx: { frontmatter: { date: DESC } } }
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
        extension: { in: ["png", "jpg", "jpeg"] }
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
