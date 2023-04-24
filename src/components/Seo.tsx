import { ReactElement } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { DeepRequiredAndNonNullable } from '../../typings/custom';
import { DEFAULT_OG_IMAGE } from '../assets/constants/defaultOgImage';

interface Props {
  description?: string;
  lang?: string;
  meta?: [];
  title: string;
  ogImage?: OgImage;
}
/**
 * Seo component that queries for data with
 *  Gatsby's useStaticQuery  hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
export const Seo = ({
  description,
  title,
  ogImage = DEFAULT_OG_IMAGE,
}: Props): ReactElement => {
  const { site } = useStaticQuery<
    DeepRequiredAndNonNullable<Queries.getSeoDataQuery>
  >(
    graphql`
      query getSeoData {
        site {
          siteMetadata {
            description
            siteUrl
            social {
              github
            }
            title
          }
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
        content={`${metadata.siteUrl}/${ogImage.path}`}
      />
      <meta property="og:image:width" content={ogImage.size.width} />
      <meta property="og:image:width" content={ogImage.size.width} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={metadata.social.github} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
    </>
  );
};
