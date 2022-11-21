import { ReactElement } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { useCustomTitle } from '../hooks';
import { GetSeoDataQuery } from '../../graphql-types';
import { DeepRequiredAndNonNullable } from '../../typings/custom';

interface Props {
  description?: string;
  lang?: string;
  meta?: [];
  title: string;
}
/**
 * Seo component that queries for data with
 *  Gatsby's useStaticQuery  hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
export const Seo = ({ description, title }: Props): ReactElement => {
  const { site } = useStaticQuery<DeepRequiredAndNonNullable<GetSeoDataQuery>>(
    graphql`
      query getSeoData {
        site(graphqlTypegen: { ne: true }) {
          siteMetadata {
            title
            description
            social {
              github
            }
          }
        }
      }
    `
  );

  const metadata = site.siteMetadata;
  const metaDescription = description || metadata.description;
  useCustomTitle(title);

  return (
    <>
      <title>{`${title} | metadata.title`}</title>
      <meta name="description" content={metaDescription} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={metaDescription} />
      <meta name="og:type" content="website" />
      <meta name="og:description" content={metaDescription} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={metadata.social.github} />
      <meta name={`twitter:title`} content={title} />
      <meta name={`twitter:description`} content={metaDescription} />
    </>
  );
};
