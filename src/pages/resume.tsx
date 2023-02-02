import { ReactElement } from 'react';
import { PageProps, graphql } from 'gatsby';
import { Seo } from '../components/Seo';
import { DeepRequiredAndNonNullable } from '../../typings/custom';

type Data = DeepRequiredAndNonNullable<Queries.getResumeImagesQuery>;
const ResumePage = ({ data }: PageProps<Data>): ReactElement => {
  return <></>;
};

export default ResumePage;

export const Head = () => <Seo title="简历-归档" />;

export const pageQuery = graphql`
  query getResumeImages {
    allFile(filter: { sourceInstanceName: { eq: "resume" } }) {
      nodes {
        childImageSharp {
          fluid {
            originalName
          }
          gatsbyImageData(
            width: 100
            height: 100
            layout: CONSTRAINED
            placeholder: BLURRED
          )
        }
      }
    }
  }
`;
