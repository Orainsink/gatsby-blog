import { ReactElement } from 'react';
import { PageProps, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { List } from 'antd';

import { Seo } from '../components/Seo';
import { Layout } from '../layout/BlogLayout';
import { COLLECTIONS } from '../assets/constants/collections';
import { DeepRequiredAndNonNullable } from '../../typings/custom';

type Data = DeepRequiredAndNonNullable<Queries.getCollectionImagesQuery>;
const CollectionPage = ({ data }: PageProps<Data>): ReactElement => {
  const icons = data.allFile.nodes;

  const getCollectImage = (icon: string) => {
    const curNode = icons.find(
      (node) => node.childImageSharp.fluid.originalName === icon
    )!;
    return getImage(curNode)!;
  };

  return (
    <Layout>
      <List
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={COLLECTIONS}
        renderItem={({ name, url, icon, description }) => (
          <List.Item>
            <GatsbyImage
              image={getCollectImage(icon)}
              alt="collection"
              className="collection-static-image"
            />
            {name}
            {url}
            {description}
          </List.Item>
        )}
      />
    </Layout>
  );
};

export default CollectionPage;

export const Head = () => <Seo title="Collection-归档" />;

export const pageQuery = graphql`
  query getCollectionImages {
    allFile(filter: { sourceInstanceName: { eq: "collection" } }) {
      nodes {
        childImageSharp {
          fluid {
            originalName
          }
          gatsbyImageData(
            width: 200
            height: 200
            layout: CONSTRAINED
            placeholder: BLURRED
          )
        }
      }
    }
  }
`;
