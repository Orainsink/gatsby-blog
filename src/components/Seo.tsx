import { ReactElement } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

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
  const { site, ogImage } = useStaticQuery<
    DeepRequiredAndNonNullable<Queries.getSeoDataQuery>
  >(
    graphql`
      query getSeoData {
        site {
          siteMetadata {
            title
            description
            social {
              github
            }
            siteUrl
          }
        }
        ogImage: file(absolutePath: { regex: "/og-bg.jpeg/" }) {
          publicURL
        }
      }
    `
  );

  const metadata = site.siteMetadata;
  const metaDescription = description || metadata.description;

  return (
    <>
      <title>{`${title} | ${metadata.title}`}</title>
      <meta name="description" content={metaDescription} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={metaDescription} />
      <meta name="og:type" content="website" />
      <meta name="og:description" content={metaDescription} />
      <meta
        property="og:image"
        content={metadata.siteUrl + ogImage.publicURL}
      />
      <meta property="og:image:width" content="256" />
      <meta property="og:image:width" content="256" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={metadata.social.github} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
    </>
  );
};
